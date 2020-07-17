const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const shortid = require('shortid')
const User = require('../models/user')
const UsersWithoutConfirmation = require('../models/userWithoutConfirmation')
const { sendMailToCompleteRegistration } = require('../services/nodemailer')

const router = express.Router()
require('dotenv').config()

const { SECRET_JWT, URL } = process.env

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
        return res.status(422).json(errors.array())
      }

      const { firstName, lastName, email, password } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json([{ msg: 'This user already exists', param: 'email' }])
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      let secretLinc = await bcrypt.hash(shortid.generate(), 12)
      secretLinc = [...secretLinc].filter(it => it !== '/').join('')

      const temporaryLinc = `${URL}/registration-confirmation-mail/${secretLinc}`

      const sentMail = await sendMailToCompleteRegistration(email, temporaryLinc)
      console.log('sentMail', sentMail);
      const user = new UsersWithoutConfirmation({ secretLinc, firstName, lastName, email, password: hashedPassword })
      // await user.save()

      return res.status(201).json([
        {
          msg: 'User created. To complete the resistance, follow the link in the mail. Get it done in 30 minutes!!! ',
          param: 'success',
        },
      ])
    } catch (e) {
      return res.status(500).json([{ msg: 'Registration error', e: e.message }])
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

      const errorMessage = [
        { msg: 'Invalid password or e-mail, try again', param: 'password' },
        { msg: 'Invalid password or e-mail, try again', param: 'email' },
      ]

      if (!user) {
        return res.status(400).json(errorMessage)
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json(errorMessage)
      }

      const jwt_payload = { userId: user.id }
      const token = jwt.sign(jwt_payload, SECRET_JWT, { expiresIn: '48h' })

      res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 2 })
      return res.json({ token, status: 'ok', firstName: user.firstName, lastName: user.lastName })
    } catch (e) {
      return res.status(500).json([{ msg: 'Login error' }])
    }
  }
)

// /api/v1/auth/trySignIn
router.get('/trySignIn', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, SECRET_JWT)
    const user = await User.findById(jwtUser.userId)

    const jwt_payload = { userId: user.id }
    const token = jwt.sign(jwt_payload, SECRET_JWT, { expiresIn: '48h' })

    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 2 })
    return res.json({ token, status: 'ok', firstName: user.firstName, lastName: user.lastName })
  } catch (e) {
    return res.status(500).json(e)
  }
})

// /api/v1/auth/signOut
router.get('/signOut', (req, res) => {
  try {
    const cookie = req.cookies
    Object.keys(cookie).forEach((prop) => {
      res.cookie(prop, '', { expires: new Date(0) })
    })
    return res.json({ status: 'signOut' })
  } catch (e) {
    return res.json(e)
  }
})

router.use((req, res, next) => {
  res.send('API auth v1 not founde...')
  next()
})

module.exports = router
