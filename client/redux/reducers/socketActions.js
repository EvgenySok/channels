import { CREATE_WEBSOCKET_MESSAGE } from './types'

export const createWebSocketMessage = (mes) => {
  return (dispatch, getState) => {
    const { firstName, lastName, userId, img } = getState().loginReducer.user
    const { _id } = getState().chatReducer.currentChannel

    if (_id) {
      const newMessage = {
        channelId: _id,
        userId,
        img,
        user: `${firstName} ${lastName}`,
        text: mes,
      }
      dispatch({
        type: CREATE_WEBSOCKET_MESSAGE,
        payload: newMessage,
      })
    }
  }
}

export const send = () => ({
  type: 'SEND_WEBSOCKET_MESSAGE',
  payload: 'event',
})
