import { UserType, ChannelType, MessageType } from './../typescriptTypes'
import io from 'socket.io-client'
import { ADD_CHANNEL, ADD_MESSAGE, ADD_USER, USER_LOGOUT } from './reducers/types'
import { updateCurrentMessage } from './reducers/chatActions'
import { Middleware } from 'redux'

type AddChannelType = { type: typeof ADD_CHANNEL, payload: Array<ChannelType> }
type AddUserType = { type: typeof ADD_USER, payload: Array<UserType> }
type UserLogoutType = { type: typeof USER_LOGOUT, payload: string }
type AddMessageType = { type: typeof ADD_MESSAGE, payload: Array<{ _id: string, messages: Array<MessageType> }> }

const socketMiddleware = (): Middleware => {
  let socket: SocketIOClient.Socket | null = null

  return (store) => (next) => async (action) => {
    if (typeof process.env.ENABLE_SOCKETS === 'undefined' && process.env.ENABLE_SOCKETS === false) {
      return next(action)
    }

    switch (action.type) {
      case 'LOGIN': {
        if (action.payload.token === '') {
          socket!.emit('disconnect')
          socket!.disconnect()
          socket = null
          break
        }
        socket = io(window.location.origin)

        socket.on('connect', () => {
          console.log(`connection established socket.id: ${socket!.id}`)
        })

        socket.on('ADD_CHANNEL', (channelsList: Array<ChannelType>) => {
          store.dispatch({
            type: ADD_CHANNEL,
            payload: channelsList,
          })
        })

        socket.on('ADD_USER', (users: Array<UserType>) => {
          store.dispatch({
            type: ADD_USER,
            payload: users,
          })
        })

        socket.on('USER_LOGOUT', (userId: string) => {
          store.dispatch({
            type: USER_LOGOUT,
            payload: userId,
          })
        })

        socket.on('ADD_MESSAGE', (message: string) => {
          store.dispatch({
            type: ADD_MESSAGE,
            payload: JSON.parse(message),
          })
        })

        socket.on('UPDATE_CURRENT_MESSAGE', () => {
          store.dispatch(updateCurrentMessage(''))
        })
        break
      }
      case 'CREATE_WEBSOCKET_MESSAGE': {
        socket!.emit('CREATE_WEBSOCKET_MESSAGE', JSON.stringify(action.payload))
        break
      }
      default:
        break
    }

    return next(action)
  }
}

export default socketMiddleware

export type SocketMiddlewareTypes =
  AddChannelType
  | AddUserType
  | UserLogoutType
  | AddMessageType