import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import Role from '../../models/Role.js'

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.CONFIG_AUTH_SECRET)
    } catch (err) {
        return null
    }
}

const checkUserAccess = (tokenUser, paramsUser, folderName, isAdmin) => {
    if (folderName === 'templates') return (isAdmin && tokenUser.id === paramsUser.id)
    
    return (tokenUser.id === paramsUser.id || isAdmin)
}

export const authFilesCreate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const paramsUserId = parseInt(req.params.userId)
        const { folderName } = req.body.folderName ? req.body : req.params

        if (folderName !== 'templates' && folderName !== 'profiles') return res.status(400).json({ error: 'Invalid folder name.' })

        if (!Number.isInteger(paramsUserId)) return res.status(404).json({ error: 'User not found.' })

        const paramsUser = await User.findByPk(paramsUserId)

        if (!paramsUser) return res.status(404).json({ error: 'User not found.' })

        const [, token] = authHeader?.split(' ') ?? []

        if (!authHeader) return res.status(403).json({ error: 'Token not provided.' })

        const decodedToken = verifyToken(token)

        if (!decodedToken) return res.status(403).json({ error: 'Access denied.' })

        const tokenUserId = decodedToken.id

        const tokenUser = await User.findByPk(tokenUserId, {
            include: [{ model: Role, as: 'roles' }]
        })

        if (!tokenUser) return res.status(404).json({ error: 'User not found.' })

        const isAdmin = tokenUser.roles.some(role => role.name === 'admin')

        if (!checkUserAccess(tokenUser, paramsUser, folderName, isAdmin)) return res.status(403).json({ error: 'Access denied.' })

        return next()
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error.' })
    }
}