import Sequelize, { Model } from 'sequelize'
import uuid from 'uuid/v4'

export default class FileProcess extends Model {
    static init(sequelize) {
        super.init(
            {
                file_name: Sequelize.STRING,
                status: Sequelize.ENUM('completed', 'processing'),
            },
            {
                sequelize
            }
        )

        this.addHook('beforeCreate', async (user) => {
            user.id = await uuid()
        })

        return this
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id' })
    }
}