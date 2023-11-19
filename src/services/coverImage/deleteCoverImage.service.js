import { prisma } from '../../database/prisma.js'
import { s3 } from '../../database/aws.js'
import { AppError } from '../../../errors/appError.js'

const deleteCoverImageService = async (id) => {
  const bucketName = process.env.BUCKET_NAME

  const image = await prisma.coverImage.findUnique({ where: { id } })

  if (!image) {
    throw new AppError('Cover image not found', 404)
  }

  try {
    await s3.deleteObject({
      Bucket: bucketName,
      Key: id,
    })
  } catch {
    throw new AppError('Failed to delete images on aws', 400)
  }

  await prisma.coverImage.delete({ where: { id: id } })
}

export default deleteCoverImageService
