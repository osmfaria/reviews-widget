import { prisma } from '../database/prisma.js'

const listProductsService = async (name) => {
  const products = await prisma.product.findMany({
    where: {
      title: {
        contains: name,
      },
    },
  })

  return products
}

export default listProductsService
