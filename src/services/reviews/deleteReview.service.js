import { AppError } from '../../../errors/appError.js'
import { prisma } from '../../database/prisma.js'

const deleteReviewService = async (reviewId) => {
  const review = prisma.review.findUnique({ where: { id: reviewId } })

  if (!review) {
    throw new AppError('Review not found', 404)
  }

  await prisma.review.delete({ where: { id: reviewId } })
}

export default deleteReviewService
