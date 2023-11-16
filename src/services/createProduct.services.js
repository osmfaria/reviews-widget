import { prisma } from '../database/prisma.js'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import { AppError } from '../../errors/appError.js'

const createProductService = async (data, file) => {
  const awsApiUrl = process.env.AWS_API
  const fileName = `${uuid()}-${file.originalname}`
  const headers = { 'Content-type': file.mimetype }

  try {
    await axios.put(`${awsApiUrl}${fileName}`, file.buffer, {
      headers: headers,
    })
  } catch {
    throw new AppError('failed to upload file', 500)
  }

  const product = await prisma.product.create({
    data: { ...data, image: fileName },
  })

  return product
}

export default createProductService
