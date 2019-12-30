import moment from 'moment'
import _ from 'lodash'
import helpers from '../../helpers'
import parse from 'csv-parse'
import fs from 'fs'

import FileProcess from '../models/FileProcess'
import ClientDto from '../dtos/Client'
import ClientTemp from '../models/ClientsTemp'

import User from '../models/User'

import Queue from '../../lib/Queue'
import HandleWithFileClientProcess from '../jobs/HandleWithFileClientProcess'

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
            const user = await User
                .findOrCreate({ where: { code: normalizedCode }, defaults: { name: helpers.titleize(username), code: normalizedCode } })
                .then(([user, created]) => {
                    return user.get({
                        plain: true
                    })
                })

            const fileObj = {
                user_id: user.id,
                file_name: originalname,
                status: 'processing'
            }

            const file = await FileProcess.create(fileObj)

            fs.createReadStream(`/home/www/api-pg/tmp/uploads/${filename}`)
                .pipe(parse({
                    delimiter: ';',
                    columns: true,
                    skip_empty_lines: true
                }, async (err, data, { lines, records }) => {

                    if (err) {
                        return res.json({ file: err })

                    }

                    const list = data.map(row => {
                        const obj = _.mapKeys(row, (v, k) => k.toLowerCase())

                        obj.status = 'processing'
                        obj.user_id = user.id
                        obj.process_id = file.id

                        return new ClientDto(obj)
                    });

                    ClientTemp.bulkCreate(list)

                    await Queue.add(HandleWithFileClientProcess.key, {
                        file
                    })
                }
                ))

            return res.json({ file })
        } catch (err) {
            return next()
        }
    }
}
export default new ClientController()