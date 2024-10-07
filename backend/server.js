import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connect from './src/db/connect.js'
import cookieParser from 'cookie-parser'
import fs from 'node:fs'

dotenv.config()
const port = process.env.PORT || 8000

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const routeFiles = fs.readdirSync('./src/routes')
routeFiles.forEach((file) => {
  //use dynamice import
  import(`./src/routes/${file}`)
    .then((route) => {
      app.use('/api/v1', route.default)
    })
    .catch((err) => {
      console.log('failed to log route file')
    })
})
console.log(routeFiles)
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Server is working!' })
})
const server = async () => {
  try {
    await connect()
    app.listen(port, () => {
      console.log(`server is running on port ${port}`)
    })
  } catch (e) {
    console.log(';failed to start server', e)
  }
}

server()
