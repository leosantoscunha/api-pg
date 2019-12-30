import Sequelize, { Model } from 'sequelize'

export default class Address extends Model {
    static init(sequelize) {
        super.init(
            {
                street: Sequelize.STRING,
                number: Sequelize.STRING,
                neighborhood: Sequelize.STRING,
                city: Sequelize.STRING,
                state: Sequelize.STRING,
                complement: Sequelize.STRING,
                cep: Sequelize.STRING,
            },
            {
                sequelize
            }
        )

        return this
    }
}