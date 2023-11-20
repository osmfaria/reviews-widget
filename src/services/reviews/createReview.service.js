import { prisma } from '../../database/prisma.js'
import { AppError } from '../../../errors/appError.js'

const createReviewService = async (productId, data) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })

  if (!product) {
    throw new AppError('Product not found', 404)
  }

  const review = await prisma.review.create({
    data: {
      ...data,
      productId,
    },
  })

  return review
}

export default createReviewService
