import { CREATE_WEBSOCKET_MESSAGE, CreateWebSocketMessageType } from './types'

// ---
export const createWebSocketMessage = (mes: string) => {
  return (dispatch: any, getState: any) => {
    const { firstName, lastName, _id, img } = getState().loginReducer.user
    const { currentChannel } = getState().chatReducer

    if (_id) {
      const newMessage:CreateWebSocketMessageType = {
        channelId: currentChannel._id,
        userId: _id,
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
