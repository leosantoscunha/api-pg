import Sequelize, { Model } from 'sequelize'

export default class ClientsTemp extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                cep: Sequelize.STRING,
                cpf: Sequelize.STRING,
                number: Sequelize.STRING,
                status: Sequelize.ENUM('completed', 'processing', 'error'),
                errors: Sequelize.JSON
            },
            {
                tableName: 'clients_temp',
                timestamp: true,
                sequelize
            }
        )

        return this
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id' })
        this.belongsTo(models.FileProcess, { foreignKey: 'process_id' })
        this.belongsTo(models.Address, { foreignKey: 'address_id' })
    }
}