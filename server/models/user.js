const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: [String], default: ['user'] },
    img: { type: String, default: 'img' },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Users', schema)
