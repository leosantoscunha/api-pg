import { resolve } from 'path'
import _ from 'lodash'
import helpers from '../../helpers'
import parse from 'csv-parse'
import fs from 'fs'
import * as Yup from 'yup'

import cep from 'cep-promise'
import Queue from '../../lib/Queue'

import HandleWithFileClientProcess from '../jobs/HandleWithFileClientProcess'

import FileProcess from '../models/FileProcess'
import ClientTemp from '../models/ClientsTemp'
import User from '../models/User'
import Client from '../models/Client'
import Address from '../models/Address'

import ClientDto from '../dtos/Client'

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

            fs.createReadStream(`${resolve('tmp', 'uploads')}/${filename}`)
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

            const uploadResponse = {

                "user_code": user.code,
                "name": user.name,
                "created_at": user.create_at,
                "file_name": file.file_name,
                "file_process": file.id,
                "url_file_process": process.env.API_HOST + 'upload/process/' + file.id,
                "process_status": file.status
            }

            return res.json(uploadResponse)
        } catch (err) {
            return next()
        }
    }

    async update(req, res, next) {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
            name: Yup.string(),
            cep: Yup.string(),
            cpf: Yup.string(),
            number: Yup.string()
                .when('cep', (cep, field) => cep ? field.required() : field)
        })

        if (!(await schema.isValid(req.body))) res.status(400).json({ error: 'Validation fails' })

        try {

            const client = await Client.findByPk(req.body.id)

            if (!client) {
                return res.json({
                    status: 'error',
                    message: 'Client not found'
                })
            }

            const address = await Address.findByPk(client.address_id)

            await cep(req.body.cep.replace('-', ''))
                .then(async data => {
                    const { id } = await address.update({ ...data, number: req.body.number })
                    client.address_id = id
                }).catch(err => {
                    return res.json({
                        status: 'error',
                        message: 'CEP validated Error',
                        data: err.errors
                    })
                })

            const updatedClient = await client.update(req.body).then(response => {
                return Client.findByPk(response.id,
                    {
                        attributes: { exclude: ['user_id', 'UserId', 'address_id'] },
                        include: [{
                            model: Address,
                        }]
                    })
            })

            return res.json(res.json({
                status: 'success',
                message: 'Client updated successfully',
                data: updatedClient
            }))
        } catch (err) {
            return next()
        }
    }
}
export default new ClientController()