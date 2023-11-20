import { AppError } from '../../../errors/appError.js'
import { prisma } from '../../database/prisma.js'

const updateReviewService = async (reviewId, data) => {
  const review = await prisma.review.findUnique({ where: { id: reviewId } })

  if (!review) {
    throw new AppError('Review not found', 404)
  }

  const updatedReview = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data,
  })

  return updatedReview
}

export default updateReviewService
