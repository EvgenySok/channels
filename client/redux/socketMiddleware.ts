import { InferActionsTypes } from './configStore'
import { UserType, ChannelType, MessageType } from './../typescriptTypes'
import io from 'socket.io-client'
import { chatActions } from './reducers/chatActions'
import { Middleware } from 'redux'

export type SocketActionsTypes = InferActionsTypes<typeof socketActions>

export const socketActions = {
  AddChannel: (channelsList: Array<ChannelType>) => ({ type: 'ADD_CHANNEL', channelsList } as const),
  AddUser: (users: Array<UserType>) => ({ type: 'ADD_USER', users } as const),
  UserLogout: (userId: string) => ({ type: 'USER_LOGOUT', userId } as const),
  AddMessage: (messages: string): { type: 'ADD_MESSAGE', messages: Array<{ _id: string, messages: Array<MessageType> }> } => ({
      type: 'ADD_MESSAGE', messages: JSON.parse(messages)
    } as const),
}

const socketMiddleware = (): Middleware => {
  let socket: SocketIOClient.Socket

  return (store) => (next) => async (action) => {
    if (typeof process.env.ENABLE_SOCKETS === 'undefined' && process.env.ENABLE_SOCKETS === false) {
      return next(action)
    }

    switch (action.type) {
      case 'LOGIN': {
        if (action.token === '') {
          socket.emit('disconnect')
          socket.disconnect()
          break
        }
        socket = io(window.location.origin)

        socket.on('connect', () => {
          console.log(`connection established socket.id: ${socket!.id}`)
        })

        socket.on('ADD_CHANNEL', (channelsList: Array<ChannelType>) => {
          store.dispatch(socketActions.AddChannel(channelsList))
        })

        socket.on('ADD_USER', (users: Array<UserType>) => {
          store.dispatch(socketActions.AddUser(users))
        })

        socket.on('USER_LOGOUT', (userId: string) => {
          store.dispatch(socketActions.UserLogout(userId))
        })

        socket.on('ADD_MESSAGE', (messages: string) => {
          store.dispatch(socketActions.AddMessage(messages))
        })

        socket.on('UPDATE_CURRENT_MESSAGE', () => {
          store.dispatch(chatActions.updateCurrentMessage(''))
        })
        break
      }
      case 'CREATE_WEBSOCKET_MESSAGE': {
        socket.emit('CREATE_WEBSOCKET_MESSAGE', JSON.stringify(action.newMessage))
        break
      }
      default:
        break
    }
    return next(action)
  }
}

export default socketMiddleware
