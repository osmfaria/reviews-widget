import { AppError } from '../../errors/appError.js'

export const fileMiddleware = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png']

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new AppError('Invalid file type, only jpeg and png are accepted'), false)
  }
}
