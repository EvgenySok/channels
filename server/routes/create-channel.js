const express = require('express')
const User = require('../models/user')

const router = express.Router()
const Channel = require('../models/channel')

// api/v1/addchannel
router.post('/', async (req, res) => {
  try {
    const { name, description, userId } = req.body

    const user = await User.findOne({ _id: userId })

    if (user.role.includes('admin')) {
      const channel = new Channel({ name, description })
      await channel.save()
      // отправить всем этот новый канал!!!!!!!!!!!!!!!!!
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

module.exports = router
