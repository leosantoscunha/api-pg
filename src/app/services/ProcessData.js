import Client from '../models/Client'
import ClientDto from '../dtos/Client'

const processData = (err, data) => {
    if (err) {
        console.log(`An error was encountered: ${err}`);
        return;
    }
    data.shift();

    const list = data.map(row => new ClientDto(...row));

    saveTemp(list)
}

const saveTemp = (list) => {
    console.log(list)
}

const analyseClient = async (list) => {
    for (let index = 0; index < list.length; index++) {
        console.log(list[index].cep.replace('-', ''))
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