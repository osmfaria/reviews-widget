import coverImageRoutes from './coverImageRoutes.js'
import galleryRoutes from './galleryRoutes.js'
import productRouter from './productRoutes.js'
import reviewRoutes from './reviewRoutes.js'

const appRoutes = (app) => {
  app.use('/products', productRouter)
  app.use('/cover-image', coverImageRoutes)
  app.use('/gallery', galleryRoutes)
  app.use('/reviews', reviewRoutes)
}

export default appRoutes
