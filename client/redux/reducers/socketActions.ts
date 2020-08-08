import { ThunkType } from './../configStore'
import { CREATE_WEBSOCKET_MESSAGE } from './types'
import { CreateWebSocketMessageType } from '../../typescriptTypes'

// ---
export const createWebSocketMessage = (mes: string):ThunkType => {
  return (dispatch, getState) => {
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
