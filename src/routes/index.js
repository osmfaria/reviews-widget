import coverImageRoutes from './coverImageRoutes.js'
import galleryRoutes from './galleryRoutes.js'
import productRouter from './productRoutes.js'
import reviewRoutes from './reviewRoutes.js'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'

const loadJSON = (path) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))

const swaggerDocs = loadJSON('../../swagger.json')
swaggerDocs.host = process.env.API_URL || 'localhost:5000'

const appRoutes = (app) => {
  app.use('/products', productRouter)
  app.use('/cover-image', coverImageRoutes)
  app.use('/gallery', galleryRoutes)
  app.use('/reviews', reviewRoutes)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

export default appRoutes
