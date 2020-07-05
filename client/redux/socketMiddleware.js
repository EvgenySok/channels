import io from 'socket.io-client'

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

        console.log('socket.id', socket)

        socket.on('message1', (message) => {
          console.log('message1')
          store.dispatch({
            type: 'SOCKET_MESSAGE_RECEIVED',
            payload: message,
          })
        })
        break
      }
      case 'SEND_WEBSOCKET_MESSAGE': {
        console.log(action.payload)

        socket.emit('event', { a: 1 })
        break
      }
      default:
        break
    }

    return next(action)
  }
}

export default socketMiddleware
