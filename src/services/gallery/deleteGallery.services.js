import { AppError } from '../../../errors/appError.js'
import { s3 } from '../../database/aws.js'
import { prisma } from '../../database/prisma.js'

const deleteGalleryService = async (galleryId) => {
  const bucketName = process.env.BUCKET_NAME

  const galleryImage = await prisma.gallery.findUnique({
    where: {
      id: galleryId,
    },
  })

  if (!galleryImage) {
    throw new AppError('gallery image not found', 404)
  }

  try {
    s3.deleteObject({
      Bucket: bucketName,
      Key: galleryId,
    })
  } catch {
    throw new AppError('failed to delete files on aws')
  }

  await prisma.gallery.delete({ where: { id: galleryId } })
}

export default deleteGalleryService
