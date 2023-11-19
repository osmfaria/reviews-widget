import { Router } from 'express'
import {
  createCoverImageController,
  deleteCoverImageController,
} from '../controller/coverImageController.js'
import multer from 'multer'
import { fileMiddleware } from '../middleware/fileMiddleware.js'

const coverImageRoutes = Router()
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileMiddleware,
  limits: { fieldSize: 5000000 },
})

coverImageRoutes.post(
  '/:product_id',
  upload.single('file'),
  createCoverImageController
)
coverImageRoutes.delete('/:image_id', deleteCoverImageController)

export default coverImageRoutes
