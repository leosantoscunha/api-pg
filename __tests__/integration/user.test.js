
import request from 'supertest'
import app from '../../src/app'
import fs from 'fs'

import factory from '../factories'

import truncate from '../util/truncate'

describe('User', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('should be able to registrer a new user', async () => {
        const user = await factory.create('User')
        expect(user).toHaveProperty('id')
    })

    it('should be able to registrer a new user and delete', async () => {
        const user = await factory.create('User')

        const response = await request(app)
            .delete(`/users/${user.code}`)

        expect(response.body).toHaveProperty('status', 'deleted')
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

        expect(client).toHaveProperty('id')

        const response = await request(app)
            .delete(`/users/${user.code}`)

        expect(response.body).toHaveProperty('status', 'deleted')
    })
})