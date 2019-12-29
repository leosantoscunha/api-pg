import User from '../models/User'

class UserController {
    async delete(req, res, next) {
        const userCode = req.params.code

        const user = await User.findOne({ where: { code: userCode } })

        if (!user) {
            return res.status(404).json({ status: false, message: `Not found user` })
        }

        await user.destroy()

        return res.json({
            status: "deleted",
            id: user.id,
            name: user.name,
        })
    }

    async getAllClients(req, res, next) {
        return res.json(
            {
                status: "completed"
            }
        )
    }
}

export default new UserController()