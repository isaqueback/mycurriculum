import Sequelize from 'sequelize'

import config from '../config/database.js'

import User from '../app/models/User.js'
import Role from '../app/models/Role.js'
import Permission from '../app/models/Permission.js'
import File from '../app/models/File.js'
import Curriculum from '../app/models/Curriculum.js'

const models = [User, Role, Permission, File, Curriculum]

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