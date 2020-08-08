export type UserType = {
  firstName: string | null
  lastName: string | null
  _id: string 
  role: Array<string>
  img: string
  isOnline: boolean
  scrollPosition: number | null
}

export type ChannelType = {
  _id: string
  name: string | null
  description: string | null
  scrollPosition: number | null
}

export type MessageType = {
  user: string
  userId: string
  img: string
  time: number
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

export type LoginErrorsMessagesType = Array<{ msg: string, param: string }>

export type LoginRequestType = [{ msg: string, param: string }]

export type LoginResponseType = { token: string, user: UserType }


