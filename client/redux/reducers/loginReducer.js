import Cookies from 'universal-cookie'

import {
  UPDATE_FIRST_NAME_FIELD,
  UPDATE_LAST_NAME_FIELD,
  UPDATE_PASSWORD_FIELD,
  UPDATE_EMAIL_FIELD,
  LOGIN,
  SET_MESSAGE_FOR_LOGIN_FORM,
} from './types'

const cookies = new Cookies()

const inicialState = {
  isLoginForm: true,
  messages: [],
  email: '',
  password: '',
  token: cookies.get('token'),
  user: {
    firstName: '',
    lastName: '',
    userId: '',
  },
}

const loginReducer = (state = inicialState, action) => {
  switch (action.type) {
    case UPDATE_FIRST_NAME_FIELD:
      return { ...state, firstName: action.payload }

    case UPDATE_LAST_NAME_FIELD:
      return { ...state, lastName: action.payload }

    case UPDATE_EMAIL_FIELD:
      return { ...state, email: action.payload }

    case UPDATE_PASSWORD_FIELD:
      return { ...state, password: action.payload }

    case SET_MESSAGE_FOR_LOGIN_FORM:
      return { ...state, messages: action.payload }

    case LOGIN: {
      console.log('LOGINstate:', { ...state, token: action.payload.token, user: action.payload.user, password: '', messages: [] })
      
      return { ...state, token: action.payload.token, user: action.payload.user, password: '', messages: [] }}

    default:
      return state
  }
}

export default loginReducer
