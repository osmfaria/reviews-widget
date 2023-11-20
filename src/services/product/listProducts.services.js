import { prisma } from '../../database/prisma.js'
import { paginateOutput } from '../../functions/paginateOuitput.js'

const listProductsService = async (name, page, limit) => {
  const products = await prisma.product.findMany({
    where: {
      title: {
        contains: name,
      },
    },
    include: {
      coverImage: true,
      gallery: true,
      reviews: {
        take: limit,
        skip: (page - 1) * limit,
      },
      _count: {
        select: {
          reviews: true,
        },
      },
    },
  })

  const paginationIndex = paginateOutput(page, limit, `/products${name || ''}`)

  return { ...paginationIndex, results: products }
}

export default listProductsService
