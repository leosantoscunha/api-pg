class Client {
    constructor(clientTemp) {
        this.process_id = clientTemp.process_id
        this.name = clientTemp.name
        this.cep = clientTemp.cep
        this.cpf = clientTemp.cpf
        this.address_id = clientTemp.address_id
        this.number = clientTemp.number
        this.user_id = clientTemp.user_id
        this.status = clientTemp.status
        this.errors = clientTemp.errors
    }
}

export default Client