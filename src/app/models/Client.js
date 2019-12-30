import Sequelize, { Model } from 'sequelize'

export default class Client extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                cep: Sequelize.STRING,
                cpf: Sequelize.STRING,
                created_at: Sequelize.DATE,
                updated_at: Sequelize.DATE
            },
            {
                timestamp: true,
                sequelize
            }
        )

        return this
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id' })
        this.belongsTo(models.Address, { foreignKey: 'address_id' })
    }
}