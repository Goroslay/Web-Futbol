import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import indexRoute from './routes/index.route.js'
import errorHandler from './middlewares/errorHandler.js'
import { swaggerDocs } from './config/swagger.js'

dotenv.config()

const app = express()
const port = process.env.SERVER_PORT

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/v1',indexRoute)
    
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`Servidor corriendo en http://localhost:${port}`)
    swaggerDocs(app,port)
})


