import { push } from 'connected-react-router'
import { UPDATE_CURRENT_MESSAGE, UPDATE_CURRENT_CHANNEL } from './types'

export const updateCurrentMessage = (mes) => ({
  type: UPDATE_CURRENT_MESSAGE,
  payload: mes,
})

export const updateCurrentChannel = (channelId) => ({
  type: UPDATE_CURRENT_CHANNEL,
  payload: channelId,
})

export const createChannel = ({ name, description }) => {
  return (dispatch, getState) => {
    const { userId } = getState().loginReducer.user
    fetch('api/v1/addchannel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        userId,
      }),
    })
      .then((r) => (r.ok ? r : Promise.reject(r)))
      .then(() => {
        dispatch(push('/'))
      })
    // .catch((data) => data.json().then((d) => dispatch(setMessages(d))))
  }
}
