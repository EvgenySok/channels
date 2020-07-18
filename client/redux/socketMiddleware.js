import io from 'socket.io-client'
import { ADD_CHANNEL } from './reducers/types'

const socketMiddleware = () => {
  let socket
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
          console.log(`connection established via socket.id: ${socket.id}`)
          socket.emit('event1', socket.id)
        })

        socket.on('event1', (data) => {   // слушать событие и что-то делать потом
          console.log('event1:', data)
        })

        socket.on('ADD_CHANNEL', (channelsList) => {
          console.log('ADD_CHANNEL', channelsList)
          store.dispatch({
            type: ADD_CHANNEL,
            payload: channelsList,
          })
        })

        socket.on('ADD_MESSAGE', (message) => {
          console.log('message1')
          store.dispatch({
            type: 'ADD_MESSAGE',
            payload: message,
          })
        })
        break
      }
      case 'CREATE_WEBSOCKET_MESSAGE': {
        socket.emit('createMessage', JSON.stringify(action.payload))
        break
      }
      default:
        break
    }

    return next(action)
  }
}

export default socketMiddleware
