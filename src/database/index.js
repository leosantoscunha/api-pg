import Sequelize from 'sequelize'

import User from '../app/models/User'
import FileProcess from '../app/models/FileProcess'
import Client from '../app/models/Client'
import ClientTemp from '../app/models/ClientsTemp'
import Address from '../app/models/Address'

import databaseConfig from '../config/database'
const models = [User, FileProcess, Client, Address, ClientTemp]

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(databaseConfig)

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models))
    }
}


export default new Database()