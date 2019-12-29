import Sequelize, { Model } from 'sequelize'

export default class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                code: Sequelize.STRING,
            },
            {
                timestamp: true,
                sequelize
            }
        )

        return this
    }
}