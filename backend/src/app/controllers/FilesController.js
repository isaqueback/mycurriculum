import File from "../models/File.js"
import Yup from 'yup'
import User from "../models/User.js"
import { S3 } from "@aws-sdk/client-s3";
import crypto from 'crypto'

const s3 = new S3({ region: process.env.AWS_ACCESS_REGION })

class FilesController {
    async index(req, res) {
        const user_id = parseInt(req.params.userId)
        const id = parseInt(req.params.id)

        const file = await File.findByPk(id, {
            where: { user_id }
        })

        if (!file) return res.status(404).json({ error: 'File not found.' })

        return res.json(file)
    }

    async show(req, res) {
        const userId = parseInt(req.params.userId)

        const user = await User.findByPk(userId, {
            include: [{ model: File, as: 'files' }]
        })

        const { files } = user

        return res.json(files)
    }

    async create(req, res) {
        const { originalname: name, size, key, location: url = '' } = req.file
        const user_id = parseInt(req.params.userId)

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            size: Yup.number().integer().required(),
            key: Yup.string().required(),
            url: Yup.string().default(''),
            user_id: Yup.number().integer().required(),
        })

        const file = { name, size, key, url, user_id }

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

            if(!oldFolderName || oldFolderName !== folderName) return res.status(400).json({error: 'Folder name not match.'})

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