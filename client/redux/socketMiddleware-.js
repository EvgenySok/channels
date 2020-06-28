const socketMiddleware = (socket) => {
  // Socket param is the client. We'll show how to set this up later.
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    /*
     * Socket middleware usage.
     * promise: (socket) => socket.emit('MESSAGE', 'hello world!')
     * type: always 'socket'
     * types: [REQUEST, SUCCESS, FAILURE]
     */
    const { promise, type, types, ...rest } = action

    if (type !== 'socket' || !promise) {
      // Move on! Not a socket request or a badly formed one.
      return next(action)
    }

    const [REQUEST, SUCCESS, FAILURE] = types
    next({ ...rest, type: REQUEST })

    return promise(socket)
      .then((result) => {
        return next({ ...rest, result, type: SUCCESS })
      })
      .catch((error) => {
        return next({ ...rest, error, type: FAILURE })
      })
  }
}

export default socketMiddleware

// https://stackoverflow.com/questions/37876889/react-redux-and-websockets-with-socket-io

// export function send(chatId, content) {
//     const message = { chatId, content };
//     return {
//       type: 'socket',
//       types: [SEND, SEND_SUCCESS, SEND_FAIL],
//       promise: (socket) => socket.emit('SendMessage', message),
//     }
//   }
