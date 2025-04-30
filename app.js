import express from 'express'
import dotenv from 'dotenv'

import indexRoute from './routes/index.route.js'

dotenv.config()

const app = express()
const port = process.env.SERVER_PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/v1',indexRoute)


app.listen(port,()=>{
    console.log(`Servidor corriendo en http://localhost:${port}`)
})


