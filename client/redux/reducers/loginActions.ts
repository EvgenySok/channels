import { ThunkType, InferActionsTypes } from './../configStore'
import { LoginErrorsMessagesType, LoginResponseType, UserType } from './../../typescriptTypes'
import { push } from 'connected-react-router'

export type ActionsLoginReducerTypes = InferActionsTypes<typeof loginActions>

export const loginActions = {
  updateFirstName: (firstName: string) => ({ type: 'UPDATE_FIRST_NAME_FIELD', firstName } as const),
  updateLastName: (lastName: string) => ({ type: 'UPDATE_LAST_NAME_FIELD', lastName } as const),
  updateEmail: (email: string) => ({ type: 'UPDATE_EMAIL_FIELD', email } as const),
  updatePassword: (password: string) => ({ type: 'UPDATE_PASSWORD_FIELD', password } as const),
  setMessagesForLoginForm: (err: LoginErrorsMessagesType) => ({ type: 'SET_MESSAGE_FOR_LOGIN_FORM', err } as const),
  login: (data?: LoginResponseType) => ({
    type: 'LOGIN',
    token: data ? data.token : '',
    user: data ? data.user : { firstName: '', lastName: '', _id: '', role: [], img: '', isOnline: true, scrollPosition: null, }
  } as const)
}

export const register = (): ThunkType => {
  return (dispatch, getState) => {
    const { firstName, lastName, email, password } = getState().loginReducer
    fetch('api/v1/auth/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    })
      .then((r) => (r.ok ? r : Promise.reject(r)))
      .then((r) => r.json())
      .then((data) => {
        dispatch(loginActions.setMessagesForLoginForm(data))
        dispatch(loginActions.updatePassword(''))
      })
      .catch((data) => data.json().then((d: LoginErrorsMessagesType) => dispatch(loginActions.setMessagesForLoginForm(d))))
  }
}

export const signIn = (): ThunkType => {
  return (dispatch, getState) => {
    const { email, password } = getState().loginReducer
    fetch('api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => (r.ok ? r : Promise.reject(r)))
      .then((r) => r.json())
      .then((data: LoginResponseType) => {
        dispatch(loginActions.login(data))
        dispatch(push('/'))
      })
      .catch((data) => data.json().then((d: LoginErrorsMessagesType) => dispatch(loginActions.setMessagesForLoginForm(d))))
  }
}

export function trySignIn(): ThunkType {
  return (dispatch) => {
    fetch('/api/v1/auth/trySignIn')
      .then((r) => r.json())
      .then((data) => {
        dispatch(loginActions.login(data))
        dispatch(push('/'))
      })
      .catch((e) => e)
  }
}

export function signOut(): ThunkType {
  return (dispatch) => {
    fetch('/api/v1/auth/signOut')
      .then((r) => r.json())
      .then(() => {
        dispatch(loginActions.login())
        dispatch(push('/'))
      })
      .catch((e) => e)
  }
}

export function tryGetUserInfo() {
  return () => {
    fetch('/api/v1/user-info')
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
      })
      .catch((e) => e)
  }
}
