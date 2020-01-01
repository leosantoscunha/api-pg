import request from 'supertest'
import app from '../../src/app'

import factory from '../factories'

import truncate from '../util/truncate'


describe('Client', () => {
    beforeEach(async () => {
        await truncate()
    })


    it('should be able to create a user. address end client', async () => {
        const user
            = await factory.create('User')

        const address
            = await factory.create('Address')

        const client = await factory.create('Client', {
            address_id: address.id,
            user_id: user.id,
            cep: address.cep,
        })

        expect(client).toHaveProperty('id')
    })

    it('should be able to create a user. address end client and delete user', async () => {
        const user
            = await factory.create('User')

        const address
            = await factory.create('Address')

        const client = await factory.create('Client', {
            address_id: address.id,
            user_id: user.id,
            cep: address.cep,
        })

        expect(client.dataValues).toHaveProperty('id')

        let clientObj = client.dataValues
        clientObj.name = 'Test Update'
        clientObj.number = "1500"

        const response = await request(app)
            .put(`/clients`)
            .send(clientObj)

        expect(response.body).toHaveProperty('status', 'success')
    })
})

