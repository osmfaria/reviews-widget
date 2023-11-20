import { prisma } from '../../database/prisma.js'
import { AppError } from '../../../errors/appError.js'

const listRatingStatsService = async (productId) => {
  const product = await prisma.product.findUnique({ where: { id: productId } })

  if (!product) {
    throw new AppError('Product not found', 404)
  }

  const ratingCount = await prisma.review.groupBy({
    by: ['rating'],
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
    orderBy: {
      rating: 'desc',
    },
  })

  const avgScore = await prisma.review.aggregate({
    where: {
      productId,
    },
    _avg: {
      rating: true,
    },
  })

  let formatedRatingCount = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

  for (let key in ratingCount) {
    const rating = ratingCount[key].rating
    formatedRatingCount[rating] = ratingCount[key]._count.rating
  }

  const formatedAvgScore = { avarageScore: avgScore._avg.rating }

  return { ...formatedRatingCount, ...formatedAvgScore }
}

export default listRatingStatsService
