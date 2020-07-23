import {
  UPDATE_CURRENT_MESSAGE,
  ADD_MESSAGE,
  UPDATE_CURRENT_CHANNEL,
  ADD_CHANNEL,
  ADD_USER,
  UPDATE_CHANNEL_SCROLL_POSITION,
  USER_LOGOUT,
} from './types'

const inicialState = {
  currentMessage: '',
  currentChannel: {
    name: '',
    channelId: '',
    description: '',
    scrollPosition: null,
  },
  channels: [], // { _id, name, description}
  users: [], // { role, _id, firstName, lastName, img , isOnline, scrollPosition}
  messages: {}, // {_id: [{message},{message}, ...], _id: [{message},{message}, ...]} message = {user, userId, img, time, text}
}

const chatReducer = (state = inicialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_MESSAGE:
      return { ...state, currentMessage: action.payload }

    case UPDATE_CURRENT_CHANNEL:
      return { ...state, currentChannel: action.payload }

    case UPDATE_CHANNEL_SCROLL_POSITION: {
      const { channelId, scrollPosition } = action.payload

      const currentChannel = { ...state.currentChannel, scrollPosition }
      const channels = state.channels.map((channel) => {
        if (channel._id === channelId) {
          return { ...channel, scrollPosition }
        }
        return channel
      })
      const users = state.users.map((user) => {
        if (user._id === channelId) {
          return { ...user, scrollPosition }
        }
        return user
      })
      return { ...state, currentChannel, channels, users }
    }

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
      return { ...state, channels: action.payload.map((it) => ({ ...it, scrollPosition: null })) }

    case ADD_USER: {
      if (typeof state.users[0] === 'undefined') {
        const newUsers = action.payload.map((user) => ({ ...user, isOnline: true, scrollPosition: null }))
        return { ...state, users: newUsers }
      }
      let newUsers = state.users
      const currentUsersIds = state.users.map((user) => user._id)
      action.payload.forEach((candidate) => {
        if (!currentUsersIds.includes(candidate._id)) {
          newUsers = [...newUsers, { ...candidate, isOnline: true, scrollPosition: null }]
        } else {
          newUsers = newUsers.map((user) => {
            if (user._id === candidate._id) {
              return { ...user, isOnline: true }
            }
            return user
          })
        }
      })

      return { ...state, users: newUsers }
    }

    case USER_LOGOUT:
      return {
        ...state,
        users: state.users.map((it) => {
          if (it._id === action.payload) {
            return { ...it, isOnline: false }
          }
          return it
        }),
      }

    default:
      return state
  }
}

export default chatReducer
