import { factory } from 'factory-girl'
import faker from 'faker'
import User from '../src/app/models/User'
import Client from '../src/app/models/Client'
import Address from '../src/app/models/Address'

faker.locale = "pt_BR"

factory.define('User', User,
    {
        name: faker.name.findName(),
        code: `PG${faker.helpers.randomize().toUpperCase()}`
    })

factory.define('Address', Address,
    {
        street: `${faker.address.streetSuffix} ${faker.address.streetName}`,
        number: faker.random.number({ min: 1, max: 99999 }),
        district: faker.address.city,
        city: faker.address.city,
        state: faker.address.state,
        complement: faker.address.secondaryAddress,
        cep: faker.address.zipCode,
    })


factory.define('Client', Client,
    {
        address_id: null,
        user_id: null,
        name: faker.name.findName(),
        cpf: faker.random.number({ min: 10000000000, max: 99999999999, precision: 11 }),
        cep: null
    })

export default factory