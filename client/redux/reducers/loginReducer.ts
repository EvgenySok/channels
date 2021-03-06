import { ActionsLoginReducerTypes } from './loginActions'
import { UserType, MessagesForLoginFormType } from './../../typescriptTypes'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export type InicialStateLoginReducerType = {
  isLoginForm: boolean
  messages: MessagesForLoginFormType
  firstName: string
  lastName: string
  email: string
  password: string 
  token: string
  user: UserType
}

export const inicialStateLoginReducer:InicialStateLoginReducerType = {
  isLoginForm: true,
  messages: [],
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  token: cookies.get('token'),
  user: {
    firstName: '',
    lastName: '',
    _id: '',
    role: [],
    img: '',
    isOnline: false,
    scrollPosition: null,
  },
}

const loginReducer = (state = inicialStateLoginReducer, action: ActionsLoginReducerTypes): InicialStateLoginReducerType => {
  switch (action.type) {
    case 'UPDATE_FIRST_NAME_FIELD':
      return { ...state, firstName: action.firstName }

    case 'UPDATE_LAST_NAME_FIELD':
      return { ...state, lastName: action.lastName }

    case 'UPDATE_EMAIL_FIELD':
      return { ...state, email: action.email }

    case 'UPDATE_PASSWORD_FIELD':
      return { ...state, password: action.password }

    case 'SET_MESSAGE_FOR_LOGIN_FORM':
      return { ...state, messages: action.err }

    case 'LOGIN':
      return { ...state, token: action.token, user: action.user, password: '', messages: [] }

    default:
      return state
  }
}

export default loginReducer
