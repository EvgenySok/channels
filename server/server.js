const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const { resolve } = require('path')
const cors = require('cors')
const socketIo = require('socket.io')
const { passportJWT } = require('./services/passportJWT.js')
const mongooseService = require('./services/mongoose.js')
const { role } = require('./services/validationUserRole.js')

require('dotenv').config()

const PORT = process.env.PORT || 5000
const { ENABLE_SOCKETS } = process.env

mongooseService.connect()

const server = express()

server.use(cors())
server.use(passport.initialize())
server.use(express.static(resolve(__dirname, '../dist')))
server.use(bodyParser.json({ limit: '50mb', extended: true }))
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
server.use(cookieParser())

passport.use('jwt', passportJWT)

const app = server.listen(PORT)

if (ENABLE_SOCKETS) {
  const io = socketIo(app)
  server.use('/socket.io', require('./services/socket')(io)) // require('./services/socket')(io);
  server.use('/api/v1/addchannel', require('./routes/create-channel')(io))
}

server.use('/api/v1/auth', require('./routes/api-v1-auth'))

server.get('/api/v1/user-info', role(['admin']), (req, res) => {
  res.json({ status: '123' })
})

server.use('/registration-confirmation-mail', require('./routes/registration-confirmation-mail'))

server.use('*', (req, res) => res.send('Request not found...'))

console.log(`Server has been started at http://localhost:${PORT}...`)
