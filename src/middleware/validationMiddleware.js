import { AppError } from '../../errors/appError.js'

export const validate = (schema) => async (req, res, next) => {
  try {
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
