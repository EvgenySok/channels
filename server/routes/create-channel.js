const express = require('express')
const User = require('../models/user')

const router = express.Router()
const Channel = require('../models/channel')

// api/v1/addchannel
const returnRouter = (io) => {
  router.post('/', async (req, res) => {
    try {
      const { name, description, userId } = req.body

      const user = await User.findOne({ _id: userId })

      if (user.role.includes('admin')) {
        const newChannel = new Channel({ name, description })
        await newChannel.save()

        Channel.find({}, (err, channels) => {
          const channelsList = []
          channels.forEach((channel) => {
            channelsList.push(channel)
          })
          io.emit('ADD_CHANNEL', channelsList)
        })

        return res.status(201).json([
          {
            msg: 'Channel created !!! Success!!! ',
            param: 'success',
          },
        ])
      }
      return res.status(500).json([{ msg: 'You do not have sufficient rights to create a channel', param: 'link' }])
    } catch (e) {
      return res.status(500).json([{ msg: 'Create channel error', e: e.message }])
    }
  })
  return router
}

// module.exports = router
module.exports = returnRouter
