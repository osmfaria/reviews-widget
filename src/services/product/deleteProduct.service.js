import { AppError } from '../../../errors/appError.js'
import { prisma } from '../../database/prisma.js'
import { s3 } from '../../database/aws.js'

const deleteProductService = async (productId) => {
  const bucketName = process.env.BUCKET_NAME

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      gallery: true,
      coverImage: true,
    },
  })

  if (!product) {
    throw new AppError('Product not found', 404)
  }

  const deleteFilesHandler = async (files) => {
    if (Array.isArray(files) && files.length) {
      try {
        Promise.all(
          files.map(async (file) => {
            await s3.deleteObject({
              Bucket: bucketName,
              Key: file.id,
            })
          })
        )
      } catch {
        throw new AppError('Failed to delete images on aws', 400)
      }
    }
  }

  deleteFilesHandler(product.gallery)

  try {
    await s3.deleteObject({
      Bucket: bucketName,
      Key: product.coverImage && product.coverImage.id,
    })
  } catch {
    throw new AppError('Failed to delete images on aws', 400)
  }

  await prisma.product.delete({ where: { id: productId } })
}

export default deleteProductService
