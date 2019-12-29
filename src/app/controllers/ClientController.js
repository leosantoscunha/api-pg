import moment from 'moment'
import helpers from '../../helpers'
import parse from 'csv-parse'
import fs from 'fs'

import ProcessData from '../services/ProcessData'

import FileProcess from '../models/FileProcess'
import ClientDto from '../dtos/Client'
import ClientTemp from '../models/ClientsTemp'

import User from '../models/User'

class ClientController {
    async upload(req, res, next) {
        const { originalname, mimetype, filename } = req.file

        if (mimetype !== 'text/csv') {
            return res.json({ message: `File extension invalid. You are pasing ${extension} instead of csv` })
        }

        const [username, code] = originalname.split('_')
        const [normalizedCode,] = code.split('.')

        if (username == undefined || normalizedCode == undefined) {
            return res.json({ message: `File name format invalid '${originalname}'. Change the file name to pattern: 'username_code.csv'` })
        }

        try {
            const user = await User.findOne({ where: { code: normalizedCode } })

            if (!user) {
                user = User.create({ name: helpers.titleize(username), code: normalizedCode })
            }

            const fileObj = {
                user_id: user.id,
                file_name: originalname,
                status: 'processing'
            }

            const file = await FileProcess.create(fileObj)

            fs.createReadStream(`/home/www/api-pg/tmp/uploads/${filename}`)
                .pipe(parse({ delimiter: ',' }, (err, data) => {
                    if (err) {
                        console.log(`An error was encountered: ${err}`);
                        return;
                    }
                    data.shift();

                    const list = data.map(row => new ClientDto(...row, null, user.id, file.id, 'processing'));

                    ClientTemp.bulkCreate(list)
                }
                ))

            return res.json({ file })
        } catch (err) {
            return next()
        }
    }
}
export default new ClientController()