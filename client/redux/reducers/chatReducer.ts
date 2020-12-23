import { SocketActionsTypes } from './../socketMiddleware'
import { ActionsChatReducerTypes } from './chatActions'
import { ChannelType, UserType, MessageType } from './../../typescriptTypes'

export type InicialStateChatReducer = {
  currentMessage: string,
  currentChannel: ChannelType,
  channels: Array<ChannelType>,
  users: Array<UserType>,
  messages: { [key: string]: Array<MessageType> },
}

const inicialState: InicialStateChatReducer = {
  currentMessage: '',
  currentChannel: {
    _id: '',
    name: '',
    description: '',
    scrollPosition: null,
  },
  channels: [{
    _id: '',
    name: '',
    description: '',
    scrollPosition: null,
  }],
  users: [],
  messages: {
    _id: [{
      user: '',
      userId: '',
      img: '',
      time: 0,
      text: '',
      _id: '',
    }]
  },
}

const chatReducer = (state = inicialState, action: ActionsChatReducerTypes | SocketActionsTypes): InicialStateChatReducer => {
  switch (action.type) {
    case 'UPDATE_CURRENT_MESSAGE':
      return { ...state, currentMessage: action.mes }

    case 'UPDATE_CURRENT_CHANNEL':
      return { ...state, currentChannel: action.channel }

    case 'UPDATE_CHANNEL_SCROLL_POSITION': {
      // const { _id, scrollPosition } = action.payload
      // const currentChannel = { ...state.currentChannel, action.scrollPosition }
      const channels = state.channels.map((channel) => {
        if (channel._id === action._id) {
          return { ...channel, scrollPosition: action.scrollPosition }
        }
        return channel
      })
      const users = state.users.map((user) => {
        if (user._id === action._id) {
          return { ...user, scrollPosition: action.scrollPosition }
        }
        return user
      })
      return { ...state, channels, users }
    }

    case 'ADD_MESSAGE': {
      const newMessages = state.messages
      action.messages.forEach((channel: { _id: string, messages: Array<MessageType> }) => {
        const { _id, messages } = channel
        if (typeof state.messages[_id] === 'undefined') {
          newMessages[_id] = messages
        } else {
          newMessages[_id] = [...newMessages[_id], ...messages]
        }
      })
      return { ...state, messages: newMessages }
    }

    case 'ADD_CHANNEL':
      return { ...state, channels: action.channelsList.map((it: ChannelType) => ({ ...it, scrollPosition: null })) }

    case 'ADD_USER': {
      if (typeof state.users[0] === 'undefined') {
        const newUsers = action.users.map((user: UserType) => ({ ...user, isOnline: true, scrollPosition: null }))
        return { ...state, users: newUsers }
      }
      let newUsers = state.users
      const currentUsersIds = state.users.map((user) => user._id)
      action.users.forEach((candidate: UserType) => {
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

    case 'USER_LOGOUT':
      return {
        ...state,
        users: state.users.map((it) => {
          if (it._id === action.userId) {
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
