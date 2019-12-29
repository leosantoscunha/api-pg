import multer from 'multer'
import { extname, resolve } from 'path'

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads')
    })
}