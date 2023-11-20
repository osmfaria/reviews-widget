const paginateMiddleware = (req, res, next) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10

  req.pagination = { page, limit }
  next()
}

export default paginateMiddleware
