import Role from "../../models/Role.js"
import User from "../../models/User.js"
import jwt from 'jsonwebtoken'

export const authCurriculumsIndex = async (req, res, next) => {
    try {
        const paramsUserId = parseInt(req.params.userId)

        if (!paramsUserId) return res.status(404).json({ error: 'User not found.' })

        const paramsUser = await User.findByPk(paramsUserId)

        if (!paramsUser) return res.status(404).json({ error: 'User not found.' })

        const authHeader = req.headers.authorization
        const [, token] = authHeader?.split(' ') ?? []

        if (!token) return res.status(403).json({ error: 'Access denied.' })

        const { id: tokenUserId } = jwt.verify(token, process.env.CONFIG_AUTH_SECRET)
        const tokenUser = await User.findByPk(tokenUserId, {
            include: [{ model: Role, as: 'roles' }]
        })
        const tokenUserRoles = tokenUser.roles

        if (paramsUserId !== tokenUserId) {
            const isAdmin = tokenUserRoles.some(role => role.name === 'admin')

            if (!isAdmin) return res.status(403).json({ error: 'Access denied.' })
        }

        return next()

    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TypeError' || err.name === 'TokenExpiredError') return res.status(403).json({ error: 'Access denied.' })

        return res.status(500).json({ error: 'Internal server error.' })
    }
}