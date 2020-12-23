import { ThunkType, InferActionsTypes } from './../configStore'
import { ChannelType } from './../../typescriptTypes'
import { push } from 'connected-react-router'

export type ActionsChatReducerTypes = InferActionsTypes<typeof chatActions>

export const chatActions = {
  updateCurrentMessage: (mes: string) => ({ type: 'UPDATE_CURRENT_MESSAGE', mes } as const),
  updateCurrentChannel: (channel: ChannelType) => ({ type: 'UPDATE_CURRENT_CHANNEL', channel } as const),
  updateChannelScrollPosition: (_id: string, scrollPosition: number) => ({ type: 'UPDATE_CHANNEL_SCROLL_POSITION', _id, scrollPosition } as const),
}

export const createChannel = (channelName: string, channeldiscription: string): ThunkType => {
  return (dispatch, getState) => {
    const { _id } = getState().loginReducer.user
    return fetch('api/v1/addchannel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channelName,
        channeldiscription,
        _id,
      }),
    })
      .then((r) => (r.ok ? r : Promise.reject(r)))
      .then(() => {
        dispatch(push('/'))
      })
    // .catch((data) => data.json().then((d) => dispatch(setMessagesForLoginForm(d))))
  }
}