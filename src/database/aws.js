import { S3 } from '@aws-sdk/client-s3'

const region = process.env.REGION

export const s3 = new S3({
  region: region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  },
})
