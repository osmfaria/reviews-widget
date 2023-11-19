import createGalleryService from '../services/gallery/createGallery.services.js'
import deleteGalleryService from '../services/gallery/deleteGallery.services.js'

export const createGalleryController = async (req, res) => {
  const galleryImages = req.files
  const { product_id } = req.params

  const gallery = await createGalleryService(product_id, galleryImages)

  res.status(201).json(gallery)
}

export const deleteGalleryController = async (req, res) => {
  const { gallery_id } = req.params

  await deleteGalleryService(gallery_id)

  res.status(204).send()
}
