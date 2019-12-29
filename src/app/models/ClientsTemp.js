import Sequelize, { Model } from 'sequelize'

export default class ClientsTemp extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                cep: Sequelize.STRING,
                cpf: Sequelize.STRING,
                status: Sequelize.STRING,
                type: Sequelize.ENUM('completed', 'new', 'error'),
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
    }
}