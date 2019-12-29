import FileProcess from '../models/FileProcess'

class FileProcessController {
    async getStatus(req, res, next) {
        const status = await FileProcess.findByPk(req.params.uuid)
        return res.json({ status })
    }
}

export default new FileProcessController()