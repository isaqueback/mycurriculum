import File from "../models/File.js"
import Role from '../models/Role.js'
import Yup from 'yup'
import User from "../models/User.js"
import { S3 } from "@aws-sdk/client-s3";
import crypto from 'crypto'
import { Op } from "sequelize";

const s3 = new S3({ region: process.env.AWS_ACCESS_REGION })

class FilesController {
    async index(req, res, next) {
        try {
            if (Object.keys(req.query).length !== 0) return next()

            const isTokenUserAdmin = req.isAdmin
            const paramsUserId = parseInt(req.params.userId)


            const user = await User.findByPk(paramsUserId, {
                include: [{ model: File, as: 'files' }, { model: Role, as: 'roles' }]
            })

            const { files, roles } = user

            const authorizedUsers = ['admin', 'basic_paid_user', 'pro_paid_user']

            const isAuthorized = roles.some(role => authorizedUsers.includes(role.name)) || isTokenUserAdmin

            if (!isAuthorized) return res.status(403).json({ error: 'Access denied.' })

            return res.json(files)
        } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error.' })
        }
    }

    async show(req, res) {
        try {
            const userId = parseInt(req.params.userId)
            const fileId = parseInt(req.query.id)
            const user = await User.findByPk(userId, {
                include: [{ model: Role, as: 'roles' }]
            })
            
            const isTokenUserAdmin = req.isAdmin

            const userRoles = user.roles
            const { folderName, amount, page } = req.query

            const limit = amount || 2
            const offset = (page || 1) * limit - limit

            let fileQuery = {}

            if (fileId) {
                fileQuery.id = fileId

                const file = await File.findOne({ where: fileQuery })

                if (!file) return res.status(404).json({ error: 'File not found.' })

                if (file.folderName === 'templates') {
                    const authorizedRoles = ['admin', 'basic_paid_user', 'pro_paid_user']

                    const isAuthorized = userRoles.some(role => authorizedRoles.includes(role.name)) || isTokenUserAdmin

                    if (!isAuthorized) return res.status(403).json({ error: 'Access denied.' })
                }

                return res.json(file)
            } else if (folderName) {
                if (folderName !== 'templates') {
                    fileQuery.user_id = userId
                    fileQuery.folder_name = folderName
                } else {
                    const adminUser = await User.findOne({
                        include: [{
                            model: Role,
                            as: 'roles',
                            where: { name: 'admin' }
                        }]
                    })

                    fileQuery.user_id = adminUser.id,
                    fileQuery.folder_name = folderName
                }
            }

            const files = await File.findAll({ where: fileQuery, limit, offset })

            if (!files.length) return res.status(404).json({ error: 'File not found.' })

            const hasTemplateFiles = files.some(file => file.folderName === 'templates')

            if (hasTemplateFiles) {
                const authorizedRoles = ['admin', 'basic_paid_user', 'pro_paid_user']

                const isAuthorized = userRoles.some(role => authorizedRoles.includes(role.name)) || isTokenUserAdmin

                if (!isAuthorized) return res.status(403).json({ error: 'Access denied.' })
            }

            return res.json(files)
        } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error.' })
        }
    }

    async count(req, res) {
        try {
            const user_id = parseInt(req.params.userId)
            const id = parseInt(req.query.id)

            const { folderName } = req.query

            let where = { user_id }

            if (id) {
                where = {
                    ...where,
                    id,
                }

                const count = await File.count({ where })

                return res.json({ count })
            } else if (folderName) {
                if (folderName !== 'templates') {
                    where = {
                        user_id,
                        folder_name: folderName
                    }
                } else {
                    const adminUser = await User.findOne({
                        include: [{
                            model: Role,
                            as: 'roles',
                            where: { name: 'admin' }
                        }]
                    })

                    where = {
                        user_id: adminUser.id,
                        folder_name: folderName
                    }
                }
            }

            const count = await File.count({ where })

            return res.json({ count })
        } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error.' })
        }
    }

    async create(req, res) {
        const { originalname: name, size, key, location: url = '' } = req.file
        const user_id = parseInt(req.params.userId)
        const folder_name = req.params.folderName

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            size: Yup.number().integer().required(),
            key: Yup.string().required(),
            url: Yup.string().default(''),
            folder_name: Yup.string().oneOf(['profiles', 'templates']).default('profiles'),
            user_id: Yup.number().integer().required(),
        })

        const file = { name, size, key, url, folder_name, user_id }

        if (!(await schema.isValid(file))) return res.status(400).json({ error: 'Error on validate schema.' })

        const [newFile, created] = await File.findOrCreate({
            where: { key },
            defaults: file
        })

        if (!created) return res.status(409).json({ error: 'File with the same name already exists.' })

        return res.json(newFile)
    }

    async update(req, res) {
        try {
            const user_id = parseInt(req.params.userId)
            const id = parseInt(req.params.id)
            const { folderName } = req.body
            let { name } = req.body

            const schema = Yup.object().shape({
                name: Yup.string().required(),
            })

            if (!(await schema.isValid({ name }))) return res.status(400).json({ error: 'Error on validate schema.' })

            const file = await File.findByPk(id, {
                where: { user_id }
            })

            if (!file) return res.status(404).json({ error: 'File not found.' })

            const newKey = await new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, hash) => {
                    if (err) reject(err)

                    const choppedFile = file.key.split('.')
                    const fileExt = '.' + choppedFile[choppedFile.length - 1]

                    name += fileExt

                    resolve(`${folderName}/${hash.toString('hex')}-${name}`)
                })
            })

            const oldFolderName = file.key.split('/')[0]

            if (!oldFolderName || oldFolderName !== folderName) return res.status(400).json({ error: 'Folder name not match.' })

            const isThereNewKey = await File.findOne({
                where: { key: newKey, user_id }
            })

            if (isThereNewKey) return res.status(409).json({ error: 'File with the same name already exists.' })

            await s3.copyObject({
                Bucket: process.env.AWS_ACCESS_BUCKET_NAME,
                CopySource: `${process.env.AWS_ACCESS_BUCKET_NAME}/${file.key}`,
                Key: newKey,
                ACL: 'public-read'
            })

            await s3.deleteObject({
                Bucket: process.env.AWS_ACCESS_BUCKET_NAME,
                Key: file.key
            })

            const newUrl = `https://${process.env.AWS_ACCESS_BUCKET_NAME}.s3.${process.env.AWS_ACCESS_REGION}.amazonaws.com/${newKey}`

            const updatedFile = await file.update({ name, key: newKey, url: newUrl })

            return res.json(updatedFile)
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error.' })
        }
    }

    async destroy(req, res) {
        try {
            const user_id = parseInt(req.params.userId)
            const id = parseInt(req.params.id)

            const file = await File.findByPk(id, {
                where: { user_id }
            })

            if (!file) return res.status(404).json({ error: 'File not found.' })

            await file.destroy()

            return res.json(file)
        } catch (err) {
            return res.status(500).json({ error: 'Internal server error.' })
        }
    }
}

export const files = new FilesController()