import * as yup from 'yup'

export const createProductSchema = yup.object().shape({
  title: yup.string.required(),
  price: yup
    .number()
    .positive()
    .required()
    .test((value) => (value.toString().split('.')[1] || '').length <= 2),
  file: yup
    .mixed()
    .required('A file is required')
    .test(
      'fileSize',
      'File too large',
      (value) => !value || (value && value.size <= 5 * 1024 * 1024)
    )
    .test(
      'fileFormat',
      'Unsupported Format',
      (value) =>
        !value ||
        (value && ['image/jpeg', 'image/png'].includes(value.mimetype))
    ),
})
