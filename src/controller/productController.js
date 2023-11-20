import createProductService from '../services/product/createProduct.services.js'
import deleteProductService from '../services/product/deleteProduct.service.js'
import listProductsService from '../services/product/listProducts.services.js'

export const createProductController = async (req, res) => {
  const data = req.body
  const coverImage = req.files.coverImage ? req.files.coverImage[0] : null
  const galleryImages = req.files.gallery || []

  const product = await createProductService(data, coverImage, galleryImages)

  res.status(201).json(product)
}

export const listProductsController = async (req, res) => {
  const name = req.query.name
  const { page, limit } = req.pagination

  const products = await listProductsService(name, page, limit)

  res.status(200).json(products)
}

export const deleteProductController = async (req, res) => {
  const { product_id } = req.params

  await deleteProductService(product_id)

  res.status(204).send()
}
