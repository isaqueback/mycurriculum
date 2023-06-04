import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import Role from '../../models/Role.js'

export const authUsersDestroy = async (req, res, next) => {
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
                if (!isAdmin) return res.status(403).json({ error: 'Access denied.' })

                return next()
            }

            if(isAdmin) return res.status(403).json({error: 'Access denied.'})

            return next()
        }

        return res.status(401).json({ error: 'Token not provided.' })
    } catch (err) {
        if (err.name === 'JsonWebTokenError') return res.status(403).json({ error: 'Access denied.' })

        return res.status(500).json({ error: 'Internal server error.' })
    }
}