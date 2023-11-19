import createCoverImageService from '../services/coverImage/createCoverImage.service.js'
import deleteCoverImageService from '../services/coverImage/deleteCoverImage.service.js'

export const deleteCoverImageController = async (req, res) => {
  const { image_id } = req.params

  await deleteCoverImageService(image_id)

  res.status(204).send()
}

export const createCoverImageController = async (req, res) => {
  const { product_id } = req.params
  const file = req.file
  const coverImage = await createCoverImageService(product_id, file)

  res.status(201).json(coverImage)
}
