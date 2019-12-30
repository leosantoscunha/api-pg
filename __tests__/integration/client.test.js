
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

})