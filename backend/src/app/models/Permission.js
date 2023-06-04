import Sequelize, { Model } from 'sequelize'

class Permission extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsToMany(models.User, {through: 'users_permissions', foreignKey: 'permission_id', as: 'users'})
        this.belongsToMany(models.Role, {through: 'roles_permissions', foreignKey: 'permission_id', as: 'roles'})
    }
}

export default Permission