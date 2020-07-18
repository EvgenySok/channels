const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    user: { type: String, required: true },
    userId: { type: String, required: true },
    img: { type: String },
    time: { type: Number, default: +new Date(), unique: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = {
  ChannelsMessages: model('channelsMessages', schema),
  PrivateMessages: model('privateMessages', schema),
}
