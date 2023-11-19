import { prisma } from '../../database/prisma.js'
import { AppError } from '../../../errors/appError.js'
import { v4 as uuid } from 'uuid'
import { s3 } from '../../database/aws.js'

const createProductService = async (data, coverImage, galleryImages) => {
  const bucketName = process.env.BUCKET_NAME
  const region = process.env.REGION
  const coverFileName = `${uuid()}-${coverImage.originalname}`
  const coverImageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${coverFileName}`

  const coverImageParams = {
    Bucket: bucketName,
    Key: coverFileName,
    Body: coverImage.buffer,
    ContentType: coverImage.mimetype,
    ACL: 'public-read',
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

    return { id: fileName, image: imageUrl }
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

  try {
    await s3.putObject(coverImageParams)
  } catch {
    throw new AppError('Failed to upload files', 400)
  }

  const galleryData = await uploadFilesHandler(galleryImages)

  const coverImageData = {
    id: coverFileName,
    image: coverImageUrl,
  }

  const product = await prisma.product.create({
    data: {
      title: data.title,
      price: Number(data.price),
      coverImage: {
        create: coverImageData,
      },
      gallery: {
        createMany: { data: galleryData },
      },
    },
    include: {
      gallery: true,
      coverImage: true,
    },
  })

  return product
}

export default createProductService
