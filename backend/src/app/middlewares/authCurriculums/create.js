import Role from "../../models/Role.js";
import User from "../../models/User.js";
import { authCurriculumsIndex } from "./index.js";
import jwt from 'jsonwebtoken'

function hasCurriculumCreationPermission(userRoles) {
    return userRoles.some(role => ['admin', 'basic_paid_user', 'pro_paid_user'].includes(role.name))
}

export const authCurriculumsCreate = async (req, res, next) => {
    try {
        authCurriculumsIndex(req, res, async () => {
            const paramsUserId = parseInt(req.params.userId)
            const paramsUser = await User.findByPk(paramsUserId, {
                include: [{ model: Role, as: 'roles' }]
            })
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

                if (!canTokenUserCreateCurriculum) return res.status(403).json({ error: 'Access denied.' })
            }

            return next()
        })
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error.' })
    }
}