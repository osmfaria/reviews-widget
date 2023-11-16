import { Router } from 'express'
import { validate } from '../middleware/validationMiddleware.js'
import { createProductSchema } from '../schemas/productSchema.js'
import { createProductController } from '../controller/productController.js'
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })
const productRouter = Router()

productRouter.post(
  '',
  upload.single('file'),
  validate(createProductSchema),
  createProductController
)

export default productRouter
