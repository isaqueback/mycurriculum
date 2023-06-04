import crypto from 'node:crypto'
import User from "../models/User.js"
import Role from "../models/Role.js"
import Permission from "../models/Permission.js"
import Mail from '../../lib/Mail.js'
import * as Yup from 'yup'
import { Op } from 'sequelize'
import { parse, addHours } from 'date-fns'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class UsersController {
  async index(req, res) {
    try {
      const users = await User.findAll()

      res.json(users)
    } catch (err) {
      res.status(500).json({ error: 'Internal server error.' })
    }
  }

  async show(req, res) {
    try {
      const id = parseInt(req.params.id)

      const user = await User.findByPk(id)

      if (!user) return res.status(404).json({ error: 'User not found.' })

      res.json(user)
    } catch (err) {
      res.status(500).json({ error: 'Internal server error.' })
    }
  }

  async create(req, res) {
    try {
      const { email, fullname, date_of_birth, gender, password, passwordConfirmation } = req.body
      const newUser = { email, fullname, date_of_birth, gender, password }

      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        fullname: Yup.string().required(),
        date_of_birth: Yup.string().matches(
          /^(?:(?:19|20)?\d{2}|[1-9]\d{0,3}|0{1,3}\d{0,2})\/(?:0?[1-9]|1[0-2]|0[1-9]|1[0-9]|2[0-9]|3[01])\/(?:0?[1-9]|[12]\d|3[01])$/,
          'Invalid date format.'
        ),
        gender: Yup.string().oneOf(['male', 'female', 'other']),
        password: Yup.string().min(8).required(),
        passwordConfirmation: Yup.string().when('password', (password, field) => password ? field.required().oneOf([Yup.ref('password')]) : field)
      })

      const userExists = await User.findOne({ where: { email } })

      if (userExists) return res.status(409).json({ error: 'User already exists.' })

      let parsedDateOfBirth = date_of_birth
      if (date_of_birth) {
        const [year, month, day] = date_of_birth.split('/')
        const formattedDateOfBirth = `${year.padStart(4, '0')}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`
        parsedDateOfBirth = parse(formattedDateOfBirth, 'yyyy/MM/dd', new Date(), { useAdditionalWeekYearTokens: false })
      }

      const freeUserRole = await Role.findOne({
        where: {
          name: 'free_user'
        },
        include: [{ model: Permission, as: 'permissions', attributes: ['id'], }],
      })

      const freeUserPermissionsIds = freeUserRole.permissions.map(permission => permission.id)

      if (!(await schema.isValid({ ...newUser, passwordConfirmation }))) return res.status(401).json({ error: 'Error on validate schema.' })

      const parseIntExpiresIn = parseInt(process.env.CONFIG_AUTH_EXPIRES_IN_2)

      const token = jwt.sign({ user: { ...newUser, date_of_birth: parsedDateOfBirth }, userRoles: [freeUserRole.id], userPermissions: freeUserPermissionsIds }, process.env.CONFIG_AUTH_SECRET_2, { expiresIn: parseIntExpiresIn })
      const confirmationLink = `${process.env.DOMAIN}/users/verify/${token}`

      await Mail.send({
        to: email,
        subject: 'Link de confirmação para criar sua conta',
        html: `<p>Seu link de confirmação é esse: <a href='${confirmationLink}'>Link de confirmação</a></p>`
      })

      res.status(201).json({ message: 'Confirmation link sent to your email.' })
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') return res.status(401).json({ error: 'User already exists.' })

      res.status(500).json({ error: 'Internal server error.' })
    }
  }

  async verifyCreation(req, res) {
    try {
      const { token } = req.params
      const { user, userRoles, userPermissions } = jwt.verify(token, process.env.CONFIG_AUTH_SECRET_2)

      const [newUser, created] = await User.findOrCreate({
        where: { email: user.email },
        defaults: user
      })

      if (!created) return res.status(409).json({ error: 'User already exists.' })

      await newUser.setRoles(userRoles)
      await newUser.setPermissions(userPermissions)

      res.json(newUser)
    } catch (err) {
      if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') return res.status(401).json({ error: 'Invalid token.' })
      res.status(500).json({ error: 'Internal server error.' })
    }
  }

  async update(req, res) {
    try {
      const id = parseInt(req.params.id)

      const { fullname, gender, date_of_birth, oldPassword, password, passwordConfirmation } = req.body
      const updatedDate = { fullname, gender, date_of_birth, password }

      const schema = Yup.object().shape({
        fullname: Yup.string(),
        date_of_birth: Yup.string().matches(
          /^(?:(?:19|20)?\d{2}|[1-9]\d{0,3}|0{1,3}\d{0,2})\/(?:0?[1-9]|1[0-2]|0[1-9]|1[0-9]|2[0-9]|3[01])\/(?:0?[1-9]|[12]\d|3[01])$/,
          'Invalid date format.'
        ),
        oldPassword: Yup.string().min(8),
        password: Yup.string().when('oldPassword', (oldPassword, field) => {
          oldPassword ? field.min(8).required() : field
        }),
        passwordConfirmation: Yup.string().when('password', (password, field) => {
          password ? field.oneOf([Yup.ref('password')]).required() : field
        })
      })

      let parsedDateOfBirth = date_of_birth

      if (date_of_birth) {
        const [year, month, day] = date_of_birth.split('/')
        const formattedDateOfBirth = `${year.padStart(4, '0')}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`
        parsedDateOfBirth = parse(formattedDateOfBirth, 'yyyy/MM/dd', new Date(), { useAdditionalWeekYearTokens: false })
      }

      if (!(await schema.isValid({ ...updatedDate, oldPassword, passwordConfirmation }))) return res.status(401).json({ error: 'Error on validate schema.' })

      const userToUpdate = await User.findByPk(id)

      if (!userToUpdate) return res.status(404).json({ error: 'User not found.' })

      if ((oldPassword || password || passwordConfirmation) && !(oldPassword && password && passwordConfirmation)) {
        return res.status(401).json({ error: 'Current password or new password or new password confirmation not provided.' })
      }

      if (oldPassword && ! await userToUpdate.checkPassword(oldPassword)) return res.status(401).json({ error: 'Password not match.' })

      const updatedUser = await userToUpdate.update({ ...updatedDate, date_of_birth: parsedDateOfBirth })

      res.json(updatedUser)
    } catch (err) {
      res.status(500).json({ error: 'Internal server error.' })
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body

      const schema = Yup.object().shape({
        email: Yup.string().email().required()
      })

      if (! await schema.isValid({ email })) return res.status(401).json({ error: 'Error on validate schema.' })

      const user = await User.findOne({ where: { email }, include: [{ model: Role, as: 'roles' }] })
      
      if(user.roles.includes('admin')) return res.status(403).json({error: 'Unauthorized access.'})

      if (!user) return res.status(404).json({ error: 'User not found.' })

      const token = crypto.randomBytes(20).toString('hex')
      const expiresAt = addHours(Date.now(), 1)
      await user.update({
        reset_password_token: token,
        reset_password_expires: expiresAt
      })

      const resetUrl = `${process.env.DOMAIN}/users/reset-password/${token}`

      await Mail.send({
        to: email,
        subject: 'Redefinir senha',
        html: `<p>Para resetar sua senha, clica no link a seguir: <a href='${resetUrl}'>Redefinir senha.</a></p>`
      })

      res.json({ message: 'Password reset email sent.' })
    } catch (err) {
      res.status(500).json({ error: 'Internal server error.' })
    }
  }

  async resetPassword(req, res) {
    try {
      const { email, password, passwordConfirmation, token } = req.body

      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required(),
        passwordConfirmation: Yup.string().when('password', (password, field) => {
          password ? field.oneOf([Yup.ref('password')]).required() : field
        }),
        token: Yup.string().min(20),
      })

      if (! await schema.isValid({ email, password, passwordConfirmation, token })) return res.status(401).json({ error: 'Error on validate schema.' })

      if (password !== passwordConfirmation) return res.status(401).json({ error: 'Password and password confirmation not match.' })

      const user = await User.findOne({
        where: {
          email,
          reset_password_token: { [Op.eq]: token, [Op.ne]: null },
          reset_password_expires: { [Op.gte]: new Date(), [Op.ne]: null }
        }
      })

      if (!user) return res.status(404).json({ error: 'User not found.' })

      if (await user.checkPassword(password)) return res.status(403).json({ error: 'The new password must be different from the current password.' })

      await user.update({
        password,
        reset_password_token: null,
        reset_password_expires: null
      })

      res.json(user)
    } catch (err) {
      res.status(500).json({ error: 'Internal server error.' })
    }
  }

  async destroy(req, res) {
    try {
      const id = parseInt(req.params.id)

      const user = await User.findByPk(id)

      if (!user) return res.status(404).json({ error: 'User not found.' })

      await user.destroy()

      res.json(user)
    } catch (err) {
      res.status(500).json({ error: 'Internal server error.' })
    }
  }
}

export const users = new UsersController()
