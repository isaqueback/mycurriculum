import { fileURLToPath } from 'url'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3 } from "@aws-sdk/client-s3";
import { extname, resolve, dirname } from 'path'
import mime from 'mime-types'
import crypto from 'crypto'
import { config } from 'dotenv'

config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const generateFileName = async (req, file) => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, hash) => {
            if (err) reject(err)

            const fileName = `${req.params.folderName}/${hash.toString('hex')}-${file.originalname}`
            resolve(fileName)
        })
    })
}

const storage = process.env.AWS_ACCESS_STORAGE_TYPE === 's3' ?
    multerS3({
        s3: new S3({ region: process.env.AWS_ACCESS_REGION }),
        bucket: process.env.AWS_ACCESS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: async (req, file, callback) => {
            try {
                const fileName = await generateFileName(req, file)

                callback(null, fileName)
            } catch (err) {
                callback(err)
            }
        },
    }) :
    multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: async (req, file, callback) => {
            try {
                const fileName = await generateFileName(file)
                callback(null, fileName)
            } catch (err) {
                callback(err)
            }
        }
    })

const upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        const allowedExtensions = [
            '.jpg',
            '.jpeg',
            '.pjpeg',
            '.png',
            '.bmp',
            '.tiff',
            '.tiff-fx',
            '.webp',
            '.svg+xml',
        ]

        const fileExt = extname(file.originalname)
        const fileMime = mime.lookup(fileExt)

        if (allowedExtensions.includes(fileExt) && fileMime) {
            callback(null, true)
        } else {
            callback(new Error('Invalid file type.'))
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    } 
})

export default upload