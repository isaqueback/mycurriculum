import Role from "../../models/Role.js";
import User from "../../models/User.js";
import { authCurriculumsIndex } from "./index.js";
import jwt from 'jsonwebtoken'

function hasCurriculumCreationPermission(userRoles) {
    return userRoles.some(role => ['admin', 'basic_paid_user', 'pro_paid_user'].includes(role.name))
}

// Verificar se dá erro ao procurar um tokenUser após deletar esse user no banco de dados

export const authCurriculumsCreate = async (req, res, next) => {
    try {
        authCurriculumsIndex(req, res, async () => {
            const paramsUserId = parseInt(req.params.userId)
            const paramsUser = await User.findByPk(paramsUserId, {
                include: [{ model: Role, as: 'roles' }]
            })

            if (!paramsUser) return res.status(404).json({ error: 'User not found.' })

            const { roles: paramsUserRoles } = paramsUser

            const canParamsUserCreateCurriculum = hasCurriculumCreationPermission(paramsUserRoles)

            if (!canParamsUserCreateCurriculum) {
                const authHeader = req.headers.authorization
                const [, token] = authHeader?.split(' ') ?? []

                const { id: tokenUserId } = jwt.verify(token, process.env.CONFIG_AUTH_SECRET)
                const tokenUser = await User.findByPk(tokenUserId, {
                    include: [{ model: Role, as: 'roles' }]
                })
                const { roles: tokenUserRoles } = tokenUser

                const canTokenUserCreateCurriculum = hasCurriculumCreationPermission(tokenUserRoles)
                if (!canTokenUserCreateCurriculum) return res.status(403).json({ error: 'Access denied.', details: 'Not allowed creating curriculum for free users.' })
            }

            return next()
        })
    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TypeError' || err.name === 'TokenExpiredError') return res.status(403).json({ error: 'Access denied.' })
        return res.status(500).json({ error: 'Internal server error.' })
    }
}