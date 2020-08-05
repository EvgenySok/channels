export const UPDATE_FIRST_NAME_FIELD = 'FIRST_NAME_FIELD'
export const UPDATE_LAST_NAME_FIELD = 'LAST_NAME_FIELD'
export const UPDATE_EMAIL_FIELD = 'UPDATE_EMAIL_FIELD'
export const UPDATE_PASSWORD_FIELD = 'PASSWORD_FIELD'
export const SET_MESSAGE_FOR_LOGIN_FORM = 'SET_MESSAGE_FOR_LOGIN_FORM'
export const LOGIN = 'LOGIN'

export const CREATE_WEBSOCKET_MESSAGE = 'CREATE_WEBSOCKET_MESSAGE'

export const UPDATE_CHANNEL_SCROLL_POSITION = 'UPDATE_CHANNEL_SCROLL_POSITION'
export const UPDATE_CURRENT_MESSAGE = 'UPDATE_CURRENT_MESSAGE'
export const UPDATE_CURRENT_CHANNEL = 'UPDATE_CURRENT_CHANNEL'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const ADD_CHANNEL = 'ADD_CHANNEL'
export const ADD_USER = 'ADD_USER'
export const USER_LOGOUT = 'USER_LOGOUT'

export type UserType = {
  firstName: string | null
  lastName: string | null
  _id: string | null
  role: Array<string>
  img: string | null
  isOnline: boolean
  scrollPosition: number | null
}

export type ChannelType = {
  _id: string | null
  name: string | null
  description: string | null
  scrollPosition: number | null
}

export type MessageType = {
  user: string
  userId: string
  img: string
  time: number | null
  text: string
  _id: string
}

export type CreateWebSocketMessageType = {
  user: string
  img: string
  text: string
  channelId: string
  userId: string
}
