const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    secretLinc: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: [String], default: ['user'] },
    // expire_at: { type: Date, default: Date.now, expires: 7200 }
  },
  {
    timestamps: true,
  }
)

schema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 })

module.exports = model('UsersWithoutConfirmation', schema)
