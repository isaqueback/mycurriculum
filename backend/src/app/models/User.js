import Sequelize, { Model } from "sequelize"
import bcrypt from 'bcryptjs'

class User extends Model {
    static init(sequelize) {
        super.init({
            email: Sequelize.STRING,
            fullname: Sequelize.STRING,
            date_of_birth: Sequelize.DATE,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            reset_password_token: Sequelize.STRING,
            reset_password_expires: Sequelize.DATE,
            gender: Sequelize.ENUM('male', 'female', 'other'),
        }, {
            sequelize
        })

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8)
            }
        })
    }

    static associate(models) {
        this.hasMany(models.File, { foreignKey: 'user_id', as: 'files' })
        this.hasMany(models.Curriculum, { foreignKey: 'user_id', as: 'curriculums' })
        this.belongsToMany(models.Role, { through: 'users_roles', foreignKey: 'user_id', as: 'roles' })
        this.belongsToMany(models.Permission, { through: 'users_permissions', foreignKey: 'user_id', as: 'permissions' })
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash)
    }
}

export default User