import Sequelize, { Model } from "sequelize";
import { S3 } from "@aws-sdk/client-s3";
import fs from 'fs'
import { promisify } from 'util'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const s3 = new S3({ region: process.env.AWS_ACCESS_REGION })
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class File extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            size: Sequelize.INTEGER,
            key: Sequelize.STRING,
            url: Sequelize.STRING,
            folder_name: Sequelize.STRING,
        }, {
            sequelize,
        })

        this.addHook('beforeSave', async (file) => {
            if (file.url === '') {
                file.url = `${process.env.SERVER_DOMAIN}${process.env.SERVER_PORT}/files/${file.key}`
            }
        })

        this.addHook('beforeDestroy', async (file) => {
            try {
                if (process.env.AWS_ACCESS_STORAGE_TYPE === 's3') {
                    await s3.deleteObject({
                        Bucket: process.env.AWS_ACCESS_BUCKET_NAME,
                        Key: file.key,
                    })
                } else if (process.env.AWS_ACCESS_STORAGE_TYPE === 'local') {
                    promisify(fs.unlink)(resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', file.key))
                } else {
                    throw new Error('Invalid storage type.')
                }
            } catch (err) {
                throw err
            }
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }
}

export default File