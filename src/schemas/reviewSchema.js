import * as yup from 'yup'

export const createReviewSchema = yup.object().shape({
  title: yup.string().required().max(40).min(3),
  description: yup.string().required().max(200).min(5),
  rating: yup.number().required().positive().max(5),
})

export const updateReviewSchema = yup.object().shape({
  title: yup.string().max(40).min(3),
  description: yup.string().max(200).min(5),
  rating: yup.number().positive().max(5),
})
