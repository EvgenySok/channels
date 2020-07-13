const express = require('express')
const User = require('../models/user')
const UsersWithoutConfirmation = require('../models/userWithoutConfirmation')

const router = express.Router()

// /registration-confirmation-mail
router.get('/:secretLinc', async (req, res) => {
  try {
    const { secretLinc } = req.params

    const candidate = await UsersWithoutConfirmation.findOne({ secretLinc })

    if (candidate) {
      const { firstName, lastName, email, password, role } = candidate

      const user = new User({ firstName, lastName, email, password, role })

      await user.save()

      return res.status(201).json([
        {
          msg: 'Mail is confirmed !!! Success!!! ',
          param: 'success',
        },
      ])
    }
    return res.status(500).json([{ msg: 'Registration error, invalid link or expired', param: 'link' }])
  } catch (e) {
    return res.status(500).json([{ msg: 'Registration error', e: e.message }])
  }
})

module.exports = router
