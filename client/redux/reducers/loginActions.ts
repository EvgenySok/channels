import { push } from 'connected-react-router'
import {
  UPDATE_FIRST_NAME_FIELD,
  UPDATE_LAST_NAME_FIELD,
  UPDATE_PASSWORD_FIELD,
  UPDATE_EMAIL_FIELD,
  LOGIN,
  SET_MESSAGE_FOR_LOGIN_FORM,
} from './types'

type UpdateFirstNameActionType = {
  type: typeof UPDATE_FIRST_NAME_FIELD
  payload: string
}
export const updateFirstName = (firstName: string): UpdateFirstNameActionType => ({
  type: UPDATE_FIRST_NAME_FIELD,
  payload: firstName,
})

type UpdateLastNameActionType = {
  type: typeof UPDATE_LAST_NAME_FIELD
  payload: string
}
export const updateLastName = (lastName: string): UpdateLastNameActionType => ({
  type: UPDATE_LAST_NAME_FIELD,
  payload: lastName,
})

type UpdateEmailActionType = {
  type: typeof UPDATE_EMAIL_FIELD
  payload: string
}
export const updateEmail = (email: string): UpdateEmailActionType => ({
  type: UPDATE_EMAIL_FIELD,
  payload: email,
})

type UpdatePasswordActionType = {
  type: typeof UPDATE_PASSWORD_FIELD
  payload: string
}
export const updatePassword = (password: string): UpdatePasswordActionType => ({
  type: UPDATE_PASSWORD_FIELD,
  payload: password,
})

type SetMessageForLoginFormActionType = {
  type: typeof SET_MESSAGE_FOR_LOGIN_FORM
  payload: LoginErrorsMessagesType
}
type LoginErrorsMessagesType = [{ msg: string, param: string }]
export const setMessages = (err: LoginErrorsMessagesType): SetMessageForLoginFormActionType => ({
  type: SET_MESSAGE_FOR_LOGIN_FORM,
  payload: err,
})
// -------
export const register = () => {
  return (dispatch: any, getState: any) => {
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
        dispatch(setMessages(data))
        dispatch(updatePassword(''))
      })
      .catch((data) => data.json().then((d: LoginErrorsMessagesType) => dispatch(setMessages(d))))
  }
}
// ------
export const signIn = () => {
  return (dispatch: any, getState: any) => {
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
      .then((data) => {
        dispatch({
          type: LOGIN,
          payload: {
            token: data.token,
            user: {
              firstName: data.firstName,
              lastName: data.lastName,
              _id: data._id,
              role: data.role,
              img: data.img,
            },
          },
        })
        dispatch(push('/'))
      })

      .catch((data) => data.json().then((d: LoginErrorsMessagesType) => dispatch(setMessages(d))))
  }
}
// ------
export function trySignIn() {
  return (dispatch: any) => {
    fetch('/api/v1/auth/trySignIn')
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: LOGIN,
          payload: {
            token: data.token,
            user: {
              firstName: data.firstName,
              lastName: data.lastName,
              _id: data._id,
              role: data.role,
              img: data.img,
            },
          },
        })
        dispatch(push('/'))
      })
      .catch((e) => e)
  }
}
// -------
export function signOut() {
  return (dispatch: any) => {
    fetch('/api/v1/auth/signOut')
      .then((r) => r.json())
      .then(() => {
        dispatch({
          type: LOGIN,
          payload: {
            token: '',
            user: {
              firstName: '',
              lastName: '',
            },
          },
        })
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
