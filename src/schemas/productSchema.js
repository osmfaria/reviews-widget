import * as yup from 'yup'

export const createProductSchema = yup.object().shape({
  title: yup.string().required().max(40).min(3),
  price: yup
    .number()
    .positive()
    .required()
    .test((value) => (value.toString().split('.')[1] || '').length <= 2),
})
