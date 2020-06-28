const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const { resolve } = require('path')
const cors = require('cors')
const socketIo = require('socket.io')
const { passportJWT } = require('./passportJWT.js')
const { role } = require('./validationUserRole.js')

require('dotenv').config()

const PORT = process.env.PORT || 5000
const { MONGO_URL, ENABLE_SOCKETS } = process.env

const server = express()
const connections = []

server.use(cors())
server.use(passport.initialize())
server.use(express.static(resolve(__dirname, '../dist')))
server.use(bodyParser.json({ limit: '50mb', extended: true }))
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
server.use(cookieParser())

passport.use('jwt', passportJWT)

server.use('/api/v1/auth', require('./routes/api-v1-auth'))

server.get('/api/v1/user-info', role(['admin']), (req, res) => {
  res.json({ status: '123' })
})

server.use('*', (req, res) => res.send('Request not found...'))

try {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
} catch (e) {
  console.log('Mongoose Error', e.message)
  process.exit(1)
}

const app = server.listen(PORT)

if (ENABLE_SOCKETS) {
  const io = socketIo(app)

  io.on('connection', (socket) => {
    connections.push(socket)
    console.log(`connection established via id: ${socket.id}`)

    socket.on('event', (data) => ({ data })) // слушать событие и что-то делать потом
    io.emit('broadcast', /* … */); // emit an event to all connected sockets
    socket.emit('request', /* … */); // emit an event to the socket

    socket.on('disconnect', () => {
      console.log(`disconnected: ${socket.id}`)
    })
  })
}
console.log(`Server has been started at http://localhost:${PORT}...`)
