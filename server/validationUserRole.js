const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('./models/user')

const { SECRET_JWT } = process.env

const handleJWT = (req, res, next, roles) => {
  return async (err, info) => {
    const error = err || info

    const jwtUser = jwt.verify(req.cookies.token, SECRET_JWT)
    const user = await User.findById(jwtUser.userId)

    if (error || !user) return res.status(401).json({ status: 401, ...err })

    if (!roles.reduce((acc, rec) => acc && user.role.some((t) => t === rec), true)) {
      return res.status(401).json({ status: 401, ...err })
    }
    return next()
  }
}

const role = (roles = []) => (req, res, next) => {
  return passport.authenticate(
    'jwt',
    {
      session: true,
    },
    handleJWT(req, res, next, roles)
  )(req, res, next)
}

exports.role = role
