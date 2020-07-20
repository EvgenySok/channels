import io from 'socket.io-client'
import { ADD_CHANNEL, ADD_MESSAGE, ADD_USER } from './reducers/types'
import { updateCurrentMessage } from './reducers/chatActions'

const socketMiddleware = () => {
  let socket = null
  return (store) => (next) => async (action) => {
    if (typeof process.env.ENABLE_SOCKETS === 'undefined' && process.env.ENABLE_SOCKETS === false) {
      return next(action)
    }

    switch (action.type) {
      case 'LOGIN': {
        if (action.payload.token === '') {
          socket.emit('disconnect')
          socket.disconnect()
          socket = null
          break
        }
        socket = io(window.location.origin)

        socket.on('connect', () => {
          console.log(`connection established socket.id: ${socket.id}`)
        })

        socket.on('ADD_CHANNEL', (channelsList) => {
          store.dispatch({
            type: ADD_CHANNEL,
            payload: channelsList,
          })
        })

        socket.on('ADD_USER', (users) => {
          store.dispatch({
            type: ADD_USER,
            payload: users,
          })
        })

        socket.on('ADD_MESSAGE', (message) => {
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
        socket.emit('CREATE_WEBSOCKET_MESSAGE', JSON.stringify(action.payload))
        break
      }
      default:
        break
    }

    return next(action)
  }
}

export default socketMiddleware
