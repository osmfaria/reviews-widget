import { prisma } from '../../database/prisma.js'
import { AppError } from '../../../errors/appError.js'

const downvoteReviewService = async (reviewId) => {
  const review = await prisma.review.findUnique({ where: { id: reviewId } })

  if (!review) {
    throw new AppError('Review not found', 404)
  }

  const downvoteReview = await prisma.review.update({
    where: { id: reviewId },
    data: {
      downvote: {
        increment: 1,
      },
    },
  })

  return downvoteReview
}

export default downvoteReviewService
