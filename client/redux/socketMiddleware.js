import io from 'socket.io-client'

const socketMiddleware = (urlForSocket) => {
  let socket
  return (store) => (next) => (action) => {
    if (typeof process.env.ENABLE_SOCKETS === 'undefined' && process.env.ENABLE_SOCKETS === false) {
      return next(action)
    }

    switch (action.type) {
      case 'LOGIN': {
        if (action.payload.token === '') {
          socket.disconnect()
          socket = null
          break
        }
        socket = io(urlForSocket)
        socket.on('message', (message) => {
          store.dispatch({
            type: 'SOCKET_MESSAGE_RECEIVED',
            payload: message,
          })
        })
        break
      }
      case 'SEND_WEBSOCKET_MESSAGE': {
        socket.emit(action.payload)
        break
      }
      default:
        break
    }

    return next(action)
  }
}

export default socketMiddleware
