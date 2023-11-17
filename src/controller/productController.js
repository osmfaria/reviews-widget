import createProductService from '../services/createProduct.services.js'
import listProductsService from '../services/listProducts.services.js'

export const createProductController = async (req, res) => {
  const data = req.body
  const coverImage = req.files.coverImage ? req.files.coverImage[0] : null
  const galleryImages = req.files.gallery || []

  const product = await createProductService(data, coverImage, galleryImages)

  res.status(201).json(product)
}

export const listProductsController = async (req, res) => {
  const name = req.query.name

  const products = await listProductsService(name)

  res.status(200).json(products)
}
