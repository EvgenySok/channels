const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const router = express.Router()
require('dotenv').config()

const { jwtSecret } = process.env

// /api/v1/auth/registration
router.post(
  '/registration',
  [
    check('firstName', 'Your first name must be at least 1 characters').trim().escape().isLength({ min: 1 }),
    check('lastName').trim().escape(),
    check('email', 'Your email is not valid').isEmail().normalizeEmail(),
    check('password', 'Your password must be at least 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        // console.log(errors.array().map((it) => it.msg))
        return res.status(422).json(errors.array())
      }

      const { firstName, lastName, email, password } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: 'This user already exists' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ firstName, lastName, email, password: hashedPassword })

      await user.save()

      res.status(201).json({ message: 'User created' })
    } catch (e) {
      res.status(500).json({ message: 'Registration error' })
    }
  }
)

// /api/v1/auth/login
router.post(
  '/login',
  [
    check('email', 'Your email is not valid').isEmail().normalizeEmail(),
    check('password', 'Your password must be at least 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array())
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (user) {
        return res.status(400).json({ message: 'User is not found' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password, try again' })
      }

      const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '48h' })

      res.json({ token, userId: user.id })
    } catch (e) {
      res.status(500).json({ message: 'Login error' })
    }
  }
)

router.use((req, res, next) => {
  res.send('API auth v1 not founde...')
  next()
})

module.exports = router
