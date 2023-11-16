import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import errorMiddleware from './middleware/errorMiddleware.js'
import appRoutes from './routes/index.js'

export const app = express()
app.use(cors())
app.use(express.json())
appRoutes(app)

app.use(errorMiddleware)
