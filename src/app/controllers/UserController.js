import User from '../models/User'
import Client from '../models/Client'
import Address from '../models/Address'

class UserController {
    async delete(req, res, next) {
        const userCode = req.params.code

        const user = await User.findOne({ where: { code: userCode } })

        if (!user) {
            return res.status(404).json({ status: false, message: `User Not found`, data: [] })
        }

        await user.destroy()

        return res.json({
            status: "deleted",
            message: "",
            data: {
                id: user.id,
                name: user.name,
            }
        })
    }

    async getAllClients(req, res, next) {

        try {
            const userCode = req.params.code

            const user = await User.findOne({ where: { code: userCode } })

            if (!user) {
                return res.status(404).json({ status: false, message: `Not found user` })
            }

            const clientslist = await Client.findAll({
                where: { user_id: user.id },
                attributes: { exclude: ['user_id', 'UserId', 'address_id'] },
                include: [{
                    model: Address,
                }]
            })

            return res.json(
                {
                    status: "completed",
                    message: '',
                    data: clientslist
                }
            )
        } catch (err) {
            return res.json(
                {
                    status: "error",
                    message: "Erro to find all client",
                    data: []
                })
        }
    }
}

export default new UserController()