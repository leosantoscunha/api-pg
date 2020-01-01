import './bootstrap'

import express from 'express'
import Youch from 'youch'
import routes from './routes'

import 'express-async-errors'

import './database'

class AppController {
    constructor() {
        this.server = express()

        this.middlewares()
        this.routes()
        this.exceptionHandle()
    }

    middlewares() {
        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }

    exceptionHandle() {
        this.server.use(async (err, req, res, next) => {
            if (process.env.NODE_ENV !== 'development') {
                return res.status(500).json({ error: 'Internal server error' })
            }

            const errors = await new Youch(err, req).toJSON()

            return res.status(500).json(errors)

        })
    }
}


export default new AppController().server