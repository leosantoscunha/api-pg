import FileProcess from '../models/FileProcess'
import ClientsTemp from '../models/ClientsTemp'
import User from '../models/User'

class FileProcessController {
    async getStatus(req, res, next) {

        try {
            const { id, file_name, status, User: user } = await FileProcess.findByPk(req.params.uuid,
                {
                    include: [{
                        model: User
                    }]
                })

            let processResponse = { id, file_name, status, user, hasError: false }

            if (processResponse.status === 'completed') {
                const countProcessWithError = await ClientsTemp.findAndCountAll({ where: { process_id: processResponse.id, status: 'error' } })

                if (countProcessWithError.count > 0) {

                    processResponse
                        .hasError = {
                        count: countProcessWithError.count,
                        rows: []
                    }

                    if (req.query.includeObjError) {
                        processResponse
                            .hasError.
                            rows = countProcessWithError.rows
                    }
                }

            }
            return res.json({ processResponse })

        } catch (error) {
            return res.json({ processResponse: {} })
        }
    }
}
export default new FileProcessController()