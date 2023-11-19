import { AppError } from '../../../errors/appError.js'
import { prisma } from '../../database/prisma.js'
import { s3 } from '../../database/aws.js'
import { v4 as uuid } from 'uuid'

const createCoverImageService = async (product_id, file) => {
  const bucketName = process.env.BUCKET_NAME
  const region = process.env.REGION
  const fileName = `${uuid()}-${file.originalname}`
  const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`

  const product = await prisma.product.findUnique({ where: { id: product_id } })

  if (!product) {
    throw new AppError('product not found', 404)
  }

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  }

  try {
    await s3.putObject(params)
  } catch {
    throw new AppError('failed to upload file', 400)
  }

  const converImage = await prisma.coverImage.create({
    data: {
      id: fileName,
      image: imageUrl,
      product: {
        connect: {
          id: product_id,
        },
      },
    },
  })

  return converImage
}

export default createCoverImageService
