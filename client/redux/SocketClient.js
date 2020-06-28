import io from 'socket.io-client'

const isBrowser = typeof window !== 'undefined'
const urlForSocket = `${isBrowser ? window.location.origin : `http://localhost:${process.env.PORT}`}/socket.io`

// Example conf. You can move this to your config file.

export default class SocketClient {
  // socket
  constructor() {
    this.socket = null
  }

  connect() {
    this.socket = io.connect(urlForSocket)
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => resolve())
      this.socket.on('connect_error', (error) => reject(error))
    })
  }

  disconnect() {
    return new Promise((resolve) => {
      this.socket.disconnect(() => {
        this.socket = null
        resolve()
      })
    })
  }

  emit(event, data) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject(new Error('No socket connection.'))

      return this.socket.emit(event, data, (response) => {
        // Response is the optional callback that you can use with socket.io in every request. See 1 above.
        if (response.error) {
          console.error(response.error)
          return reject(response.error)
        }

        return resolve()
      })
    })
  }

  on(event, fun) {
    // No promise is needed here, but we're expecting one in the middleware.
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject(new Error('No socket connection.'))

      this.socket.on(event, fun)
      return resolve()
    })
  }
}
