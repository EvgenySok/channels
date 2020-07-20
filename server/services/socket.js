const express = require('express')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const User = require('../models/user')
const Channel = require('../models/channel')
const { ChannelsMessages, UsersMessages, OneMessage } = require('../models/message')

const router = express.Router()
require('dotenv').config()

const { SECRET_JWT } = process.env

const returnRouter = (io) => {
  let userIdFromToken
  const connections = {} // { _id : socket.id}
  let usersOnline = []
  // ================================================= CONNECT ================================================================================================

  io.on('connection', async (socket) => {
    const cookies = cookie.parse(socket.request.headers.cookie || '')
    const { token } = cookies
    userIdFromToken = jwt.verify(token, SECRET_JWT).userId
    if (userIdFromToken) {
      if (typeof connections[userIdFromToken] !== 'undefined') {
        socket.disconnect()
      }
      connections[userIdFromToken] = socket.id

      const user = await User.findOne({ _id: userIdFromToken })
      const { role, _id, firstName, lastName, img } = user

      if (typeof usersOnline === 'undefined') {
        usersOnline = [{ role, _id, firstName, lastName, img }]
      } else {
        usersOnline = [...usersOnline, { role, _id, firstName, lastName, img }]
      }

      console.log('usersOnline:', usersOnline)
      console.log('connections:', connections)

      socket.emit('ADD_USER', usersOnline)
      // sending channels messegers
      await Channel.find({}, (err, channels) => {
        const channelsList = []
        channels.forEach((channel) => {
          channelsList.push(channel)
        })
        socket.emit('ADD_CHANNEL', channelsList)
      })
      await ChannelsMessages.find({}, (err, channelsMessages) => {
        socket.emit('ADD_MESSAGE', JSON.stringify(channelsMessages))
      })
      // sending privat messegers
      await UsersMessages.find({ _id }, { messages: 1, _id: 0 }, (err, userMessages) => {
        const arrayUserMes = userMessages[0].messages
        const listUsersId = arrayUserMes.map((mes) => mes.userId).filter((it, id, array) => array.indexOf(it) === id)
        const sortedMes = listUsersId.map((userId) => ({
          _id: userId,
          messages: arrayUserMes.filter((mes) => mes.userId === userId),
        }))
        socket.emit('ADD_MESSAGE', JSON.stringify(sortedMes))
      })
    }

    // console.log(`Object.keys(io.sockets.sockets): ${Object.keys(io.sockets.sockets)}`)
    // console.log(`io.of('/').adapter): ${Object.keys(io.of('/').adapter)}`)
    // io.sockets.to(userId).emit(event, data)
    // ========================================= CREATE_WEBSOCKET_MESSAGE ===================================================================================
    socket.on('CREATE_WEBSOCKET_MESSAGE', async (data) => {
      const { channelId, userId, img, user, text } = JSON.parse(data)
      // is valid channelId ?
      if (channelId.match(/^[0-9a-fA-F]{24}$/)) {
        const doesChannalExit = await Channel.exists({ _id: channelId })
        const message = new OneMessage({ user, userId, img, text, time: +new Date() })
        // for channels
        if (doesChannalExit) {
          const query = { _id: channelId }
          const update = { $push: { messages: message } }
          const options = { upsert: true, new: true, setDefaultsOnInsert: true }

          ChannelsMessages.findOneAndUpdate(query, update, options, (err) => {
            if (err) {
              console.log('channelMessage err:', err.message)
            } else {
              io.emit('ADD_MESSAGE', JSON.stringify([{ _id: channelId, messages: [message._doc] }]))
              socket.emit('UPDATE_CURRENT_MESSAGE')
            }
          })
        }
        // for users
        else {
          const query = channelId === userId ? { _id: { $in: [userId] } } : { _id: { $in: [userId, channelId] } }
          const update = { $push: { messages: message } }
          const options = { upsert: true, new: true, setDefaultsOnInsert: true }

          UsersMessages.updateMany(query, update, options, (err) => {
            if (err) {
              console.log('UsersMessages err:', err.message)
            } else {
              io.emit('ADD_MESSAGE', JSON.stringify([{ _id: channelId, messages: [message._doc] }]))
              socket.emit('UPDATE_CURRENT_MESSAGE')
            }
          })
        }
      } else {
        return new Error('not valid channelId')
      }
    })
    // ================================================= DISCONNECT ================================================================================================

    socket.on('disconnect', () => {
      const user = Object.entries(connections).find((connect) => connect[1] === socket.id)
      if (user) {
        const userId = user[0]
        usersOnline = usersOnline.find((it) => it._id === userId)
        delete connections[userId]
        console.log('usersOnline:', usersOnline)
        console.log('connections:', connections)
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
