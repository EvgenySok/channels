import { push } from 'connected-react-router'
import { UPDATE_CURRENT_MESSAGE, UPDATE_CURRENT_CHANNEL, ADD_MESSAGE } from './types'

export const updateCurrentMessage = (mes) => ({
  type: UPDATE_CURRENT_MESSAGE,
  payload: mes,
})

export const updateCurrentChannel = (channelId) => ({
  type: UPDATE_CURRENT_CHANNEL,
  payload: channelId,
})

// export const addMessage = (mes) => {
//   return (dispatch, getState) => {
//     const { firstName, lastName, userId } = getState().loginReducer.user
//     const { channelId } = getState().messageReducer.currentChannel
//     // создать сообщение
//     const newMessage = {
//       channelId,
//       userId,

//       id: +new Date(),
//       img: 'https://i.imgur.com/8Km9tLL.jpg',
//       // time: +new Date(),
//       user: `${firstName} ${lastName}`,
//       text: mes,
//     }

//     // сохранить в базе

//     // в случае успеха чистим инпут добавляем всем
//     newMessage.id = +new Date()
//     dispatch(updateCurrentMessage(''))
//     dispatch({
//       type: ADD_MESSAGE,
//       payload: newMessage,
//     })
//   }
// }

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
