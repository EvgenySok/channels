const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const { resolve } = require('path')
const passportJWT = require('./passport.js')

const server = express()

require('dotenv').config()

const PORT = process.env.PORT || 5000
const { mongoUrl } = process.env

server.use(passport.initialize())
passport.use('jwt', passportJWT.jwt)

server.use(express.static(resolve(__dirname, '../dist')))

server.use(bodyParser.json({ limit: '50mb', extended: true }))
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
server.use(cookieParser())

server.use('/api/v1/auth', require('./routes/api-v1-auth'))

server.use('*', (req, res) => res.send('Request not found...'))

async function start() {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    server.listen(PORT, () => {
      console.log(`Server has been started at http://localhost:${PORT}...`)
    })
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
