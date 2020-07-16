import { UPDATE_CURRENT_MESSAGE, UPDATE_CURRENT_CHANNEL, ADD_MESSAGE } from './types'

export const updateCurrentMessage = (mes) => ({
  type: UPDATE_CURRENT_MESSAGE,
  payload: mes,
})

export const updateCurrentChannel = (channelId) => ({
  type: UPDATE_CURRENT_CHANNEL,
  payload: channelId,
})

export const saveMessage = (mes) => {
  return (dispatch, getState) => {
    const { firstName, lastName, userId } = getState().loginReducer.user
    const { channelId } = getState().messageReducer.currentChannel
    // создать сообщение
    const newMessage = {
      channelId,
      id: +new Date(),
      img: 'https://i.imgur.com/8Km9tLL.jpg',
      time: +new Date(),
      user: `${firstName} ${lastName}`,
      text: mes,
      userId,
    }

    // сохранить в базе

    // в случае успеха чистим инпут добавляем всем
    newMessage.id = +new Date()
    dispatch(updateCurrentMessage(''))
    dispatch({
      type: ADD_MESSAGE,
      payload: newMessage,
    })
  }
}
