const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const User = require('./models/user')

require('dotenv').config()

const { SECRET_JWT } = process.env

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = SECRET_JWT
// opts.issuer = 'accounts.examplesoft.com'
// opts.audience = 'yoursite.net'
const passportJWT = new JwtStrategy(opts, (jwt_payload, done) => {
  User.findOne({ id: jwt_payload.userId }, (err, user) => {
    if (err) {
      return done(err, false)
    }
    if (user) {
      return done(null, user)
    }
    return done(null, false)
    // or you could create a new account
  })
})
exports.jwt = passportJWT
