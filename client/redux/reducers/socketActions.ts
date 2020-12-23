import { ThunkType } from './../configStore'
import { CreateWebSocketMessageType } from '../../typescriptTypes'

export const createWebSocketMessage = (mes: string): ThunkType => {
  return async (dispatch, getState) => {
    const { firstName, lastName, _id, img } = getState().loginReducer.user
    const { currentChannel } = getState().chatReducer

    if (_id) {
      const newMessage: CreateWebSocketMessageType = {
        channelId: currentChannel._id,
        userId: _id,
        img,
        user: `${firstName} ${lastName}`,
        text: mes,
      }
      return dispatch({
        type: 'CREATE_WEBSOCKET_MESSAGE',
        newMessage,
      })
    }
  }
}

export const send = () => ({
  type: 'SEND_WEBSOCKET_MESSAGE',
  payload: 'event',
})
