export const paginateOutput = (page, limit, route) => {
  const url = process.env.API_URL
  let previousPage = null

  const nextPage = `${url}${route}?page=${page + 1}&limit=${limit}`

  if (page != 1) {
    previousPage = `${url}${route}?page=${page - 1}&limit=${limit}`
  }

  return { previousPage, nextPage }
}
