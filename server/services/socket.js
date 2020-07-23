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
    // have a token from a cookie?
    if (userIdFromToken) {
      // is this user already online?
      if (typeof connections[userIdFromToken] === 'undefined') {
        connections[userIdFromToken] = socket.id

        const user = await User.findOne({ _id: userIdFromToken })
        const { role, _id, firstName, lastName, img } = user

        if (typeof usersOnline === 'undefined') {
          usersOnline = [{ role, _id, firstName, lastName, img }]
        } else {
          socket.emit('ADD_USER', usersOnline)
          socket.broadcast.emit('ADD_USER', [{ role, _id, firstName, lastName, img }])
          usersOnline = [...usersOnline, { role, _id, firstName, lastName, img }]
        }
      } else {
        // if already online...
        // socket.disconnect( )
      }

      console.log('usersOnline:', usersOnline)
      console.log('connections:', connections)

      // sending channels messegers
      await Channel.find({}, (err, channels) => {
        if (err) {
          console.log('Channel err:', err.message)
        } else {
          const channelsList = []
          channels.forEach((channel) => {
            channelsList.push(channel)
          })
          socket.emit('ADD_CHANNEL', channelsList)
        }
      })
      await ChannelsMessages.find({}, (err, channelsMessages) => {
        if (err) {
          console.log('ChannelsMessages err:', err.message)
        } else {
          socket.emit('ADD_MESSAGE', JSON.stringify(channelsMessages))
        }
      })
      // sending privat messegers
      await UsersMessages.find({ _id: userIdFromToken }, { privateMessages: 1, _id: 0 }, (err, userMessages) => {
        if (err) {
          console.log('UsersMessages err:', err.message)
        } else if (userMessages[0]) {
          socket.emit('ADD_MESSAGE', JSON.stringify([userMessages[0].privateMessages]))
        }
      })
    }

    // ========================================= CREATE_WEBSOCKET_MESSAGE ===================================================================================
    socket.on('CREATE_WEBSOCKET_MESSAGE', async (data) => {
      const { channelId, userId, img, user, text } = JSON.parse(data)
      const message = new OneMessage({ user, userId, img, text, time: +new Date() })
      // is valid channelId ?
      if (channelId.match(/^[0-9a-fA-F]{24}$/)) {
        const doesChannalExit = await Channel.exists({ _id: channelId })
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
        else if (channelId !== userId) {
          console.log('console:', channelId, userId)

          const queryForUser = { _id: userId, 'privateMessages._id': channelId }
          const queryForChannel = { _id: channelId, 'privateMessages._id': userId }

          const update = { $push: { 'privateMessages.messages': message } }
          const options = { upsert: true, new: true, setDefaultsOnInsert: true }
          UsersMessages.findOneAndUpdate(queryForUser, update, options, (err) => {
            if (err) {
              console.log('UsersMessages err:', err.message)
            } else {
              socket.emit('ADD_MESSAGE', JSON.stringify([{ _id: channelId, messages: [message._doc] }]))
              socket.emit('UPDATE_CURRENT_MESSAGE')
            }
          })
          UsersMessages.findOneAndUpdate(queryForChannel, update, options, (err) => {
            if (err) {
              console.log('UsersMessages err:', err.message)
            } else {
              io.to(connections[channelId.toString()]).emit(
                'ADD_MESSAGE',
                JSON.stringify([{ _id: userId, messages: [message._doc] }]))
            }
          }) 

          // const query =   { _id: { $in: [userId, channelId] } } // { _id: userId }  //
          // const update = { $push: { messages: message } }
          // const options = { upsert: true, new: true, setDefaultsOnInsert: true, usePushEach: true }
          // UsersMessages.updateMany(query, update, options, (err) => {
          //   if (err) {
          //     console.log('UsersMessages err:', err.message)
          //   } else {
          //     socket.emit('ADD_MESSAGE', JSON.stringify([{ _id: channelId, messages: [message._doc] }]))
          //     socket.emit('UPDATE_CURRENT_MESSAGE')
          //     io.to(connections[channelId.toString()]).emit(
          //       'ADD_MESSAGE',
          //       JSON.stringify([{ _id: userId, messages: [message._doc] }])
          //     )
          //   }
          // })
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
        io.emit('USER_LOGOUT', userId)
        if (typeof usersOnline !== 'undefined') {
          usersOnline = usersOnline.filter((it) => it._id.toString() !== userId)
        }
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
