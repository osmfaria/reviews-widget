import { AppError } from '../../../errors/appError.js'
import { prisma } from '../../database/prisma.js'

const listReviewService = async (productId) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })

  if (!product) {
    throw new AppError('Product not found', 404)
  }

  const reviews = await prisma.review.findMany({
    where: {
      productId: productId,
    },
    orderBy: {
      upvote: 'desc',
    },
  })

  return reviews
}

export default listReviewService
