
import request from 'supertest'
import app from '../../src/app'
import fs from 'fs'

import factory from '../factories'

import truncate from '../util/truncate'

describe('Client', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('should be able to registrer a new client', async () => {
        const user = await factory.create('User')
        console.log('user', user.id)

        const address = await factory.create('Address')
        console.log('address', address.id)

        const client = await factory.attrs('Client',
            {
                user_id: user.id,
                address_id: address.id,
                cep: address.cep
            })
        console.log(client)
        expect(client).toHaveProperty('id')
    })
})