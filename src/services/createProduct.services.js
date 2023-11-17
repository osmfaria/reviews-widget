import { prisma } from '../database/prisma.js'
import { v4 as uuid } from 'uuid'
import { AppError } from '../../errors/appError.js'
import { S3 } from '@aws-sdk/client-s3'

const createProductService = async (data, file) => {
  const fileName = `${uuid()}-${file.originalname}`
  const bucketName = process.env.BUCKET_NAME
  const region = process.env.REGION
  const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`

  const s3 = new S3({
    region: region,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    },
  })

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  }

  try {
    await s3.putObject(params)
  } catch (error) {
    throw new AppError('Failed to upload file', 500)
  }

  const product = await prisma.product.create({
    data: { ...data, image: imageUrl },
  })

  return product
}

export default createProductService
