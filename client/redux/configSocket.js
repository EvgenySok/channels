import io from 'socket.io-client'

const isBrowser = typeof window !== 'undefined'
const urlForSocket = `${isBrowser ? window.location.origin : `http://localhost:${process.env.PORT}`}/socket.io`

let socket

// const socketActions = {
//   connected: (data) => ({
//     type: 'SOCKET_CONNECTED',
//     data,
//   }),
//   message: (data) => {
//     return JSON.parse(data)
//   },
//   disconnected: (data) => ({
//     type: 'SOCKET_DISCONNECTED',
//     data,
//   }),
// }

if (typeof process.env.ENABLE_SOCKETS !== 'undefined' && process.env.ENABLE_SOCKETS) {
  const initSocket = () => {
    socket = io(urlForSocket)

    socket.on('connect', function () { });
    // socket.on('event', function (data) { });
    socket.on('disconnect', function () { });

    socket.emit('event', 'event') // вызвать событие на сервере

    // socket.onopen = () => {
    //   store.dispatch(socketActions.connected)
    // }

    // socket.onmessage = (message) => {
    //   // eslint-disable-next-line no-console
    //   console.log(message)

    //   // socket.close();
    // }

    // socket.onclose = () => {
    //   store.dispatch(socketActions.disconnected)
    //   setTimeout(() => {
    //     initSocket()
    //   }, 2000)
    // }
  }

  initSocket()
}

export default function getSocket() {
  return socket
}
