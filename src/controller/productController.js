import createProductService from '../services/createProduct.services.js'

export const createProductController = async (req, res) => {
  const { file, ...data } = req.validatedData
  const image = req.file

  const product = await createProductService(data, image)

  res.status(200).json(product)
}
