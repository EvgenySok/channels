import {
  UPDATE_FIRST_NAME_FIELD,
  UPDATE_LAST_NAME_FIELD,
  UPDATE_PASSWORD_FIELD,
  UPDATE_EMAIL_FIELD,
  LOGIN,
} from './types'

const inicialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  token: '',
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

    case LOGIN:
      return { ...state, token: action.payload }

    default:
      return state
  }
}

export default loginReducer
