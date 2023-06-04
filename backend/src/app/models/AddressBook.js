import Sequelize, { Model } from "sequelize";

class AddressBook extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            cell_phone: Sequelize.STRING,
            telephone: Sequelize.STRING,
            country: Sequelize.STRING,
            district: Sequelize.STRING,
            city: Sequelize.STRING,
            address: Sequelize.STRING,
            address_complement: Sequelize.STRING,
            cep: Sequelize.STRING,
        }, {
            sequelize,
        })

        return this
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }
}

export default AddressBook