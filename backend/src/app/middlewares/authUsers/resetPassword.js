import User from "../../models/User.js"
import Role from "../../models/Role.js"
import jwt from 'jsonwebtoken'
import * as Yup from 'yup'

export const authUsersResetPassword = async (req, res, next) => {
    try {
        const { email } = req.body

        if (email === process.env.ADMIN_EMAIL) return res.status(403).json({ error: 'Access denied.' })

        const authHeader = req.headers.authorization

        if (authHeader) {
            const [, token] = authHeader.split(' ')

            const { id: tokenUserId } = jwt.verify(token, process.env.CONFIG_AUTH_SECRET)

            const tokenUser = await User.findByPk(tokenUserId, {
                include: [{ model: Role, as: 'roles' }]
            })

            if (!tokenUser) return res.status(404).json({ error: 'User not found.' })

            const isAdmin = tokenUser.roles.some(role => role.name === 'admin')

            if (isAdmin) {
                const { password, passwordConfirmation } = req.body
                const schema = Yup.object().shape({
                    email: Yup.string().email().required(),
                    password: Yup.string().min(8).required(),
                    passwordConfirmation: Yup.string().when('password', (password, field) => {
                        password ? field.oneOf([Yup.ref('password')]).required() : field
                    }),
                })

                if (! await schema.isValid({ email, password, passwordConfirmation })) return res.status(401).json({ error: 'Error on validate schema.' })

                if (password !== passwordConfirmation) return res.status(401).json({ error: 'Password and password confirmation not match.' })

                const user = await User.findOne({
                    where: { email }
                })

                if (!user) return res.status(404).json({ error: 'User not found.' })

                if (await user.checkPassword(password)) return res.status(403).json({ error: 'The new password must be different from the current password.' })

                await user.update({
                    password,
                    reset_password_token: null,
                    reset_password_expires: null,
                })

                return res.json(user)
            }
        }

        return next()
    } catch (err) {
        console.log(err)
        if (err.name === 'JsonWebTokenError') return res.status(403).json({ error: 'Access denied.' })

        return res.status(500).json({ error: 'Internal server error.' })
    }
}