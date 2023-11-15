import { AppError } from '../../errors/appError.js'

const errorMiddleware = (err, req, res, _) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  return res.status(500).json({
    message: 'Internal server error',
  })
}

export default errorMiddleware
