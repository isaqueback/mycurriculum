import User from "../../models/User.js"
import Role from "../../models/Role.js"
import jwt from 'jsonwebtoken'

export const authUsersShow = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const paramsUserId = parseInt(req.params.id)

        if (!Number.isInteger(paramsUserId)) return res.status(404).json({ error: 'User not found.' })

        if (authHeader) {
            const [, token] = authHeader.split(' ')

            const { id: tokenUserId } = jwt.verify(token, process.env.CONFIG_AUTH_SECRET)

            const tokenUser = await User.findByPk(tokenUserId, {
                include: [{ model: Role, as: 'roles' }]
            })

            if (!tokenUser) return res.status(404).json({ error: 'User not found.' })

            const isAdmin = tokenUser.roles.some(role => role.name === 'admin')

            if (paramsUserId !== tokenUserId) {
                if (isAdmin) {
                    const paramsUser = await User.findByPk(paramsUserId)

                    if (!paramsUser) return res.status(404).json({ error: 'User not found.' })

                    return res.json(paramsUser)
                } else {
                    return res.status(403).json({ error: 'Access denied.' })
                }
            }

            if (paramsUserId !== tokenUserId) return res.status(403).json({ error: 'Access denied.' })

            return next()
        }

        return res.status(403).json({ error: 'Access denied.' })
    } catch (err) {
        if (err.name === 'JsonWebTokenError') return res.status(403).json({ error: 'Access denied.' })

        return res.status(500).json({ error: 'Internal server error.' })
    }
}