
import request from 'supertest'
import app from '../../src/app'
import fs from 'fs'

import factory from '../factories'

import truncate from '../util/truncate'
import ClientTemp from '../../src/app/models/ClientsTemp'


describe('Client', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('should be able get to all client type by process_id', async () => {
        const list = await ClientTemp.findAll({ where: { process_id: file.id } })

        expect(list).toHaveLength
    })
})