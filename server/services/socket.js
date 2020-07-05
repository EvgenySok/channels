const express = require('express')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const router = express.Router()
require('dotenv').config()

const { SECRET_JWT } = process.env

const returnRouter = (io) => {
  let userId
  // let connections = {}

  io.on('connection', (socket) => {
    const cookies = cookie.parse(socket.request.headers.cookie || '')
    const { token } = cookies
    userId = jwt.verify(token, SECRET_JWT).userId
    // connections.push(socket)
    // connections = { ...connections, [socket.id]: { userId, socket } }
    console.log(`connection established via userId: ${userId}`)
    // console.log(`connections: ${Object.keys(connections).length}`)
    console.log(`connection established via socket.id: ${socket.id}`)
    console.log(`Object.keys(io.sockets.sockets): ${Object.keys(io.sockets.sockets)}`)
    console.log(`io.of('/').adapter): ${Object.keys(io.of('/').adapter)}`)
    // io.sockets.to(userId).emit(event, data)

    socket.emit('message1', socket.id)

    socket.on('event', (data) => {   // слушать событие и что-то делать потом
      console.log('event1:', data)
    })
    // io.emit('broadcast', /* … */); // emit an event to all connected sockets
    // socket.emit('request', /* … */); // emit an event to the socket
    socket.on('disconnect', () => {
      console.log(`${socket.name} has disconnected from the chat.${socket.id}`)
      // delete connections[socket.id]
      // const i = connections.indexOf(socket)
      // connections = connections.filter((cl, index) => index !== i)
      // console.log(`connections: ${Object.keys(connections).length}`)
    })
  })

  router.use((req, res, next) => {
    res.send('API auth v1 not founde...')
    next()
  })
  return router
}

module.exports = returnRouter
