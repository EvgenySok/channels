const express = require('express')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const User = require('../models/user')
const Channel = require('../models/channel')
const { ChannelsMessages, PrivateMessages } = require('../models/message')

const router = express.Router()
require('dotenv').config()

const { SECRET_JWT } = process.env

const returnRouter = (io) => {
  let userIdFromToken
  const connections = {} // { _id : socket.id}
  const channelsList = []
  Channel.find({}, (err, channels) => {
    channels.forEach((channel) => {
      channelsList.push(channel)
    })
  })

  io.on('connection', (socket) => {
    const cookies = cookie.parse(socket.request.headers.cookie || '')
    const { token } = cookies
    userIdFromToken = jwt.verify(token, SECRET_JWT).userId
    connections[userIdFromToken] = socket.id
    socket.emit('ADD_CHANNEL', channelsList)

    // const listChannels = await Channel.exists({ _id: channelId })


    console.log(`Object.keys(io.sockets.sockets): ${Object.keys(io.sockets.sockets)}`)
    console.log(`io.of('/').adapter): ${Object.keys(io.of('/').adapter)}`)
    // io.sockets.to(userId).emit(event, data)

    socket.emit('message1', socket.id)

    socket.on('event', (data) => {   // слушать событие и что-то делать потом
      console.log('event1:', data)
    })
    // io.emit('broadcast', /* … */); // emit an event to all connected sockets
    // socket.emit('request', /* … */); // emit an event to the socket


    socket.on('createMessage', async (data) => {
      const { channelId, userId, img, user, text } = JSON.parse(data)
      // message = {
      //   [0]   channelId: '123',
      //   [0]   userId: '5f1178271c888e0724a77f38',
      //   [0]   img: 'https://i.imgur.com/8Km9tLL.jpg',
      //   [0]   user: 'Evgeny Sokov',
      //   [0]   text: 'jytjy'
      //   [0] }

      // channelId это канал? тогда сохраняем в этот канал и отправляем всем пользователям
      let doesChannalExit
      if (channelId.match(/^[0-9a-fA-F]{24}$/)) {
        doesChannalExit = await Channel.exists({ _id: channelId })
        if (doesChannalExit) {
          const channelMessage = new ChannelsMessages({ user, userId, img, text })
          await channelMessage.save()
          console.log('channelMessage:', channelMessage)
          io.emit('broadcast', /* … */)
        }
        // в противном случае сохраняем двум пользователям, 
        // отправляем им это сообщение
        // чистим инпут отправителя активировать, деактивировать кнопку
        else {
          const privateMessage = new PrivateMessages({ user, userId, img, text })
          console.log('privateMessage:', privateMessage)
        }
      } else {
        console.log('not valid channelId:', channelId)
      }
    })
    socket.on('disconnect', () => {
      const user = Object.entries(connections).find((connect) => connect[1] === socket.id)
      if (user) {
        delete connections[user[0]]
      }
    })
  })

  router.use((req, res, next) => {
    res.send('API auth v1 not founde...')
    next()
  })
  return router
}

module.exports = returnRouter
