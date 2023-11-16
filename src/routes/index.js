import productRouter from './productRoutes.js'

const appRoutes = (app) => {
  app.use('/products', productRouter)
}

export default appRoutes
