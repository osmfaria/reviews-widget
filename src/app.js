import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import errorMiddleware from './middleware/errorMiddleware'

export const app = express()
app.use(cors())
app.use(express.json())
app.use(errorMiddleware)
