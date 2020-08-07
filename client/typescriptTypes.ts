export type UserType = {
  firstName: string | null
  lastName: string | null
  _id: string | null
  role: Array<{ msg: string, param: string }>
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

export type LoginErrorsMessagesType = [{ msg: string, param: string }]

export type LoginRequestType = [{ msg: string, param: string }]

export type LoginResponseType = { token: string, user: UserType }


