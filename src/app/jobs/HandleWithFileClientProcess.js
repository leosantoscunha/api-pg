import cep from 'cep-promise'
import User from '../models/User'
import FileProcess from '../models/FileProcess'
import ClientsTemp from '../models/ClientsTemp'
import Client from '../models/Client'
import Address from '../models/Address'

class HandleWithFileClientProcess {
    get key() {
        return 'HandleWithFileClientProcess'
    }

    async handle({ data }) {

        const { file } = data

        const fileProcess = await FileProcess.findByPk(file.id)
        const list = await ClientsTemp.findAll({ where: { process_id: file.id, status: 'processing' } })

        for (let index = 0; index < list.length; index++) {
            await cep(list[index].cep.replace('-', ''))
                .then(async data => {
                    data.number = list[index].number
                    const { id } = await Address.create(data)
                    list[index].address_id = id
                }).catch(err => {
                    //TODO: melhorar json de errors
                    list[index].errors = { errors: { address: err.errors } }
                })

            if (!list[index].errors) {

                const {
                    name,
                    cep,
                    cpf,
                    user_id,
                    address_id
                } = list[index]

                const userObj = { name, cep, cpf, user_id, address_id }

                await Client.create(userObj)
                await list[index].update({ status: 'completed', address_id: address_id })
            }
            else {
                await list[index].update({ status: 'error', address_id: null, errors: list[index].errors })
            }
            await fileProcess.update({ status: 'completed' })
        }

    }
}

export default new HandleWithFileClientProcess() 