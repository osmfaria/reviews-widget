import { AppError } from '../../../errors/appError.js'
import { prisma } from '../../database/prisma.js'
import { s3 } from '../../database/aws.js'
import { v4 as uuid } from 'uuid'

const createGalleryService = async (product_id, galleryImages) => {
  const bucketName = process.env.BUCKET_NAME
  const region = process.env.REGION

  const product = await prisma.product.findUnique({ where: { id: product_id } })

  if (!product) {
    throw new AppError('product not found', 404)
  }

  const uploadFilesToS3 = async (file) => {
    const fileName = `${uuid()}-${file.originalname}`
    const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`

    const batchParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    }
    await s3.putObject(batchParams)

    return {
      id: fileName,
      image: imageUrl,
      productId: product_id,
    }
  }

  const uploadFilesHandler = async (files) => {
    if (Array.isArray(files) && files.length) {
      try {
        return Promise.all(
          files.map((file) => {
            return uploadFilesToS3(file)
          })
        )
      } catch {
        throw new AppError('Failed to upload files', 400)
      }
    }
  }

  const galleryData = await uploadFilesHandler(galleryImages)

  const converImage = await prisma.gallery.createMany({
    data: galleryData,
  })

  return converImage
}

export default createGalleryService
