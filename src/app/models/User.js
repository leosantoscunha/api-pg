import Sequelize, { Model } from 'sequelize'

export default class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                code: Sequelize.STRING,
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
        this.hasMany(models.Client)
    }
}