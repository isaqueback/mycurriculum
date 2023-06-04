import Sequelize, { Model } from 'sequelize'

class Role extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsToMany(models.User, {through: 'users_roles', foreignKey: 'role_id', as: 'users'})
        this.belongsToMany(models.Permission, {through: 'roles_permissions', foreignKey: 'role_id', as: 'permissions'})
    }
}

export default Role