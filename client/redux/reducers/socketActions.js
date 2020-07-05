import { SEND_WEBSOCKET_MESSAGE } from './types'

export const sendWsMessage = () => ({
  type: SEND_WEBSOCKET_MESSAGE,
  payload: 'event',
})

export const send = () => ({
  type: SEND_WEBSOCKET_MESSAGE,
  payload: 'event',
})