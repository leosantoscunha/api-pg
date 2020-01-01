import { Router } from 'express'
import multer from 'multer'
import multerConfig from '../src/config/multer'

import UserController from './app/controllers/UserController'
import ClientController from './app/controllers/ClientController'
import FileProcessController from './app/controllers/FileProcessController'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/clients/upload', upload.single('file'), ClientController.upload)
routes.put('/clients', upload.single('file'), ClientController.update)

routes.delete('/users/:code', UserController.delete)

routes.get('/users/:code/clients/', UserController.getAllClients)

routes.get('/upload/process/:uuid', FileProcessController.getStatus)


// routes.put('/clients/:id', ClientController.update)
// routes.delete('/clients', ClientController.delete)



export default routes;