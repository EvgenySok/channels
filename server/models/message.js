const { Schema, model } = require('mongoose')

const oneMessageSchema = new Schema(
  {
    user: { type: String, required: true },
    userId: { type: String, required: true },
    img: { type: String, default: '' },
    time: { type: Number, default: +new Date(), unique: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const messagesSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  messages: [oneMessageSchema],
})

module.exports = {
  ChannelsMessages: model('ChannelsMessages', messagesSchema),
  UsersMessages: model('UsersMessages', messagesSchema),
  OneMessage: model('oneMessage', oneMessageSchema),
}
