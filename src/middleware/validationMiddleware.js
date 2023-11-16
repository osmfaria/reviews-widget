import { AppError } from '../../errors/appError.js'

export const validate = (schema) => async (req, res, next) => {
  try {
    if (req.file) {
      const { mimetype, size } = req.file
      const fileDataForValidation = { mimetype, size }
      req.body = { ...req.body, file: fileDataForValidation }
    }

    const validatedData = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })

    req.validatedData = validatedData

    next()
  } catch (err) {
    const errors = err.inner.reduce((acc, error) => {
      if (!acc[error.path]) {
        acc[error.path] = error.message
      }
      return acc
    }, {})

    next(new AppError(errors, err.statusCode))
  }
}
