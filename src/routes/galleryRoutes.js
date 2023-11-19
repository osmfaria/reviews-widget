import { Router } from 'express'
import multer from 'multer'
import { fileMiddleware } from '../middleware/fileMiddleware.js'
import {
  createGalleryController,
  deleteGalleryController,
} from '../controller/galleryController.js'

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileMiddleware,
  limits: { fieldSize: 5000000 },
})

const galleryRoutes = Router()

galleryRoutes.post(
  '/:product_id',
  upload.array('files'),
  createGalleryController
)
galleryRoutes.delete('/:gallery_id', deleteGalleryController)

export default galleryRoutes
