import express from 'express'
import 'express-async-errors'
import cors from 'cors'

export const app = express()
app.use(cors())
app.use(express.json())
