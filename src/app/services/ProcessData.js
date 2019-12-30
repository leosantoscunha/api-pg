import Client from '../models/Client'
import ClientDto from '../dtos/Client'

const analyseClient = async (list) => {
    for (let index = 0; index < list.length; index++) {
        await cep(list[index].cep.replace('-', ''))
            .then(data => {
                console.log(data)
                list[index].address = data
            }).catch(err => {
                list[index].address = false
                list[index].errors = err.errors[0].message
            })


    }
    console.log(list)
}

export default { processData }