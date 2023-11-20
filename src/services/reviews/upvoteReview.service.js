import { prisma } from '../../database/prisma.js'
import { AppError } from '../../../errors/appError.js'

const upvoteReviewService = async (reviewId) => {
  const review = await prisma.review.findUnique({ where: { id: reviewId } })

  if (!review) {
    throw new AppError('Review not found', 404)
  }

  const upvoteReview = await prisma.review.update({
    where: { id: reviewId },
    data: {
      upvote: {
        increment: 1,
      },
    },
  })

  return upvoteReview
}

export default upvoteReviewService
