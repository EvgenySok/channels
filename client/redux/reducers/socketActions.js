import { CREATE_WEBSOCKET_MESSAGE } from './types'
// import { updateCurrentMessage } from './messageActions'

export const sendWebSocketMessage = (mes) => {
  return (dispatch, getState) => {
    const { firstName, lastName, userId, img } = getState().loginReducer.user
    const { channelId } = getState().messageReducer.currentChannel
    // создать сообщение
    if (channelId) {
      const newMessage = {
        channelId,
        userId,
        img,
        user: `${firstName} ${lastName}`,
        text: mes,
      }
      // отправить на сервер
      dispatch({
        type: CREATE_WEBSOCKET_MESSAGE,
        payload: newMessage,
      })
      // dispatch(updateCurrentMessage(''))
    }
  }
}

export const send = () => ({
  type: SEND_WEBSOCKET_MESSAGE,
  payload: 'event',
})
