import { Router } from 'express'
import { validate } from '../middleware/validationMiddleware.js'
import {
  createReviewSchema,
  updateReviewSchema,
} from '../schemas/reviewSchema.js'
import {
  createReviewController,
  deleteReviewController,
  downvoteReviewController,
  listRatingStatsController,
  listReviewController,
  updateReviewController,
  upvoteReviewController,
} from '../controller/reviewController.js'

const reviewRoutes = Router()

reviewRoutes.post(
  '/:product_id',
  validate(createReviewSchema),
  createReviewController
)
reviewRoutes.patch('/downvote/:review_id', downvoteReviewController)
reviewRoutes.patch('/upvote/:review_id', upvoteReviewController)
reviewRoutes.patch(
  '/:review_id',
  validate(updateReviewSchema),
  updateReviewController
)
reviewRoutes.get('/:product_id', listReviewController)
reviewRoutes.get('/ratings/:product_id', listRatingStatsController)
reviewRoutes.delete('/:review_id', deleteReviewController)

export default reviewRoutes
