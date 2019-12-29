class Client {
    constructor(name, cep, cpf, address_id, user_id, process_id, status, errors = []) {
        this.process_id = process_id
        this.name = name
        this.cep = cep
        this.cpf = cpf
        this.address_id = address_id
        this.user_id = user_id
        this.status = status
        this.errors = errors
    }
}

export default Client