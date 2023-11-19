import { prisma } from '../../database/prisma.js'

const listProductsService = async (name) => {
  const products = await prisma.product.findMany({
    where: {
      title: {
        contains: name,
      },
    },
    include: {
      coverImage: true,
      gallery: true,
    },
  })

  return products
}

export default listProductsService
