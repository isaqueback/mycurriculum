import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import Role from '../../models/Role.js'

export const authFilesIndex = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const paramsUserId = parseInt(req.params.userId)

        if (!Number.isInteger(paramsUserId)) return res.status(404).json({ error: 'User not found.' })

        const paramsUser = await User.findByPk(paramsUserId)

        if (!paramsUser) return res.status(404).json({ error: 'User not found.' })

        const [, token] = authHeader?.split(' ') ?? []

        if (authHeader) {
            const { id: tokenUserId } = jwt.verify(token, process.env.CONFIG_AUTH_SECRET)

            const tokenUser = await User.findByPk(tokenUserId, {
                include: [{ model: Role, as: 'roles' }]
            })

            if (!tokenUser) return res.status(404).json({ error: 'User not found.' })

            const isAdmin = tokenUser.roles.some(role => role.name === 'admin')
            req.isAdmin = isAdmin

            if (tokenUser.id !== paramsUser.id) {
                if (isAdmin) return next()

                return res.status(403).json({ error: 'Access denied.' })
            }

            return next()
        }

        return res.status(403).json({ error: 'Token not provided.' })
    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TypeError' || err.name === 'TokenExpiredError') return res.status(403).json({ error: 'Access denied.' })
        return res.status(500).json({ error: 'Internal server error.' })
    }
}