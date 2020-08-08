import { RootStateType, ThunkType } from './../configStore'
import { ThunkAction, Action } from '@reduxjs/toolkit'
import { ChannelType } from './../../typescriptTypes'
import { push } from 'connected-react-router'
import { UPDATE_CURRENT_MESSAGE, UPDATE_CURRENT_CHANNEL, UPDATE_CHANNEL_SCROLL_POSITION } from './types'

type UpdateCurrentMessageType = {
  type: typeof UPDATE_CURRENT_MESSAGE
  payload: string
}
export const updateCurrentMessage = (mes: string): UpdateCurrentMessageType => ({
  type: UPDATE_CURRENT_MESSAGE,
  payload: mes,
})

type UpdateCurrentChannelType = {
  type: typeof UPDATE_CURRENT_CHANNEL
  payload: ChannelType
}
export const updateCurrentChannel = (channel: ChannelType): UpdateCurrentChannelType => ({
  type: UPDATE_CURRENT_CHANNEL,
  payload: channel,
})

type UpdateChannelScrollPositionType = {
  type: typeof UPDATE_CHANNEL_SCROLL_POSITION
  payload: { _id: string, scrollPosition: number }
}
export const updateChannelScrollPosition = (_id: string, scrollPosition: number): UpdateChannelScrollPositionType => ({
  type: UPDATE_CHANNEL_SCROLL_POSITION,
  payload: { _id, scrollPosition },
})

export const createChannel = (channelName: string, channeldiscription: string): ThunkType => {
  return (dispatch, getState) => {
    const { _id } = getState().loginReducer.user
    fetch('api/v1/addchannel', {
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

export type ChatReducerType =
  UpdateCurrentMessageType
  | UpdateCurrentChannelType
  | UpdateChannelScrollPositionType