import { Router } from 'express'
import { validate } from '../middleware/validationMiddleware.js'
import { createProductSchema } from '../schemas/productSchema.js'
import {
  createProductController,
  deleteProductController,
  listProductsController,
} from '../controller/productController.js'
import multer from 'multer'
import { fileMiddleware } from '../middleware/fileMiddleware.js'
import paginateMiddleware from '../middleware/paginateMiddleware.js'

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileMiddleware,
  limits: { fieldSize: 5000000 },
})
const productRouter = Router()

productRouter.post(
  '',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'gallery', maxCount: 5 },
  ]),
  validate(createProductSchema),
  createProductController
)

productRouter.get('', paginateMiddleware, listProductsController)

productRouter.delete('/:product_id', deleteProductController)

export default productRouter
