import coverImageRoutes from './coverImageRoutes.js'
import galleryRoutes from './galleryRoutes.js'
import productRouter from './productRoutes.js'

const appRoutes = (app) => {
  app.use('/products', productRouter)
  app.use('/cover-image', coverImageRoutes)
  app.use('/gallery', galleryRoutes)
}

export default appRoutes
