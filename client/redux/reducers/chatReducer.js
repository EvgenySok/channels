import { UPDATE_CURRENT_MESSAGE, ADD_MESSAGE, UPDATE_CURRENT_CHANNEL, ADD_CHANNEL, ADD_USER } from './types'

const inicialState = {
  currentMessage: '',
  currentChannel: {
    name: '',
    channelId: '',
    description: '',
  },
  channels: [], // { _id, name, description}
  users: [], // { role, _id, firstName, lastName, img }
  messages: {}, // {_id: [{message},{message}, ...], _id: [{message},{message}, ...]} message = {user, userId, img, time, text}
}

const chatReducer = (state = inicialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_MESSAGE:
      return { ...state, currentMessage: action.payload }

    case UPDATE_CURRENT_CHANNEL:
      return { ...state, currentChannel: action.payload }

    case ADD_MESSAGE: {
      const newMessages = state.messages
      action.payload.forEach((channel) => {
        const { _id, messages } = channel
        if (typeof state.messages[_id] === 'undefined') {
          newMessages[_id] = messages
        } else {
          newMessages[_id] = [...state.messages[_id], ...messages]
        }
      })
      return { ...state, messages: newMessages }
    }

    case ADD_CHANNEL:
      return { ...state, channels: action.payload }

    case ADD_USER: {
      if (typeof state.users === 'undefined') {
        const newUsers = action.payload.map((user) => ({ ...user, isOnline: true }))
        return { ...state, users: newUsers }
      }
      let newUsers = state.users
      const usersId = state.users.map((user) => user._id)
      action.payload.forEach((candidate) => {
        if (!usersId.includes(candidate._id)) {
          newUsers = [...newUsers, { ...candidate, isOnline: true }]
        }
      })
      return { ...state, users: newUsers }
    }

    default:
      return state
  }
}

export default chatReducer
