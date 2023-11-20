import createReviewService from '../services/reviews/createReview.service.js'
import deleteReviewService from '../services/reviews/deleteReview.service.js'
import downvoteReviewService from '../services/reviews/downvoteReview.service.js'
import listRatingStatsService from '../services/reviews/listRatingStats.service.js'
import listReviewService from '../services/reviews/listReview.service.js'
import updateReviewService from '../services/reviews/updateReview.service.js'
import upvoteReviewService from '../services/reviews/upvoteReview.service.js'

export const createReviewController = async (req, res) => {
  const { product_id } = req.params
  const data = req.validatedData

  const review = await createReviewService(product_id, data)

  res.status(201).json(review)
}

export const upvoteReviewController = async (req, res) => {
  const { review_id } = req.params

  const review = await upvoteReviewService(review_id)

  res.status(200).json(review)
}

export const downvoteReviewController = async (req, res) => {
  const { review_id } = req.params

  const review = await downvoteReviewService(review_id)

  res.status(200).json(review)
}

export const listReviewController = async (req, res) => {
  const { product_id } = req.params

  const reviews = await listReviewService(product_id)

  res.status(200).json(reviews)
}

export const deleteReviewController = async (req, res) => {
  const { review_id } = req.params

  await deleteReviewService(review_id)

  res.status(204).send()
}

export const updateReviewController = async (req, res) => {
  const { review_id } = req.params
  const data = req.validatedData

  const updatedReview = await updateReviewService(review_id, data)

  res.status(200).json(updatedReview)
}

export const listRatingStatsController = async (req, res) => {
  const { product_id } = req.params

  const stats = await listRatingStatsService(product_id)

  res.status(200).json(stats)
}
