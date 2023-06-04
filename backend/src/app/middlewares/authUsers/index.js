import User from "../../models/User.js"
import Role from "../../models/Role.js"
import jwt from 'jsonwebtoken'

export const authUsersIndex = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (authHeader) {
            const [, token] = authHeader.split(' ')

            const { id: userId } = jwt.verify(token, process.env.CONFIG_AUTH_SECRET)

            const user = await User.findByPk(userId, {
                include: [{ model: Role, as: 'roles' }]
            })

            if (!user) return res.status(404).json({ error: 'User not found.' })

            const isAdmin = user.roles.some(role => role.name === 'admin')

            if (!isAdmin) return res.status(403).json({ error: 'Access denied.' })

            return next()
        }

        return res.status(403).json({ error: 'Access denied.' })
    } catch (err) {
        if (err.name === 'JsonWebTokenError') return res.status(403).json({ error: 'Access denied.' })

        return res.status(500).json({ error: 'Internal server error.' })
    }
}