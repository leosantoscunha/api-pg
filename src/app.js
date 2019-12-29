// import { config } from 'dotenv'

// config({
//     path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
// })

import express from 'express'
import routes from './routes'
import './database'

class AppController {
    constructor() {
        this.server = express()

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }
}


export default new AppController().server