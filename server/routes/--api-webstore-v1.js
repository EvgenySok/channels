const express = require('express')

const router = express.Router()

router.use((req, res, next) => {
  res.send('API webstore v1 not founde...')
  next()
})

module.exports = router