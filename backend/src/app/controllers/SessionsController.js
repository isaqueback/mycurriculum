import * as Yup from 'yup'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

class SessionsController {
    async show(req, res) {
        try {
            const { token } = req.params

            const user = jwt.verify(token, process.env.CONFIG_AUTH_SECRET)

            res.json(user)

        } catch (err) {
            if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') return res.status(401).json({ error: 'Invalid token.' })
            res.status(500).json({ error: 'Internal server error.' })
        }


    }

    async create(req, res) {
        try {
            const { email, password } = req.body
            const credentials = { email, password }

            const schema = Yup.object().shape({
                email: Yup.string().email().required(),
                password: Yup.string().required()
            })

            if (! await schema.isValid(credentials)) return res.status(400).json({ error: 'Error on validate schema.' })

            const user = await User.findOne({
                where: { email }
            })

            if (!user) return res.status(404).json({ error: 'User not found.' })

            if (! await user.checkPassword(password)) return res.status(401).json({ error: 'Password not match.' })

            const token = jwt.sign({ id: user.id, }, process.env.CONFIG_AUTH_SECRET, { expiresIn: process.env.CONFIG_AUTH_EXPIRES_IN })

            res.status(201).json({
                user: { id: user.id },
                token
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal server error.' })
        }
    }
}

export const sessions = new SessionsController()