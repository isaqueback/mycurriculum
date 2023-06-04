import Sequelize from 'sequelize'

import config from '../config/database.js'

import User from '../app/models/User.js'
import AddressBook from '../app/models/AddressBook.js'
import Role from '../app/models/Role.js'
import Permission from '../app/models/Permission.js'

const models = [User, AddressBook, Role, Permission]

class Database {
    constructor() {
        this.connection = new Sequelize(config)
        this.init()
        this.associate()
    }

    init() {
        models.forEach(model => model.init(this.connection))
    }

    associate() {
        models.forEach(model => {
            if (model.associate) model.associate(this.connection.models)
        })
    }
}

export default new Database()