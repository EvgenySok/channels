import { AppDispatch } from './../configStore'
import { ThunkAction, Action } from '@reduxjs/toolkit'
import { RootStateType } from '../configStore'
import { LoginErrorsMessagesType, UserType, LoginResponseType } from './../../typescriptTypes'
import { push } from 'connected-react-router'
import { History } from 'history'
// import { push } from 'react-router-redux'
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
export const setMessagesForLoginForm = (err: LoginErrorsMessagesType): SetMessageForLoginFormActionType => ({
  type: SET_MESSAGE_FOR_LOGIN_FORM,
  payload: err,
})

type ThunkType = ThunkAction<void, RootStateType, unknown, Action<string> >

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
        dispatch(setMessagesForLoginForm(data))
        dispatch(updatePassword(''))
      })
      .catch((data) => data.json().then((d: LoginErrorsMessagesType) => dispatch(setMessagesForLoginForm(d))))
  }
}
export type LoginActionType = {
  type: typeof LOGIN
  payload: {
    token: string
    user: UserType,
  },
}
const login = (data?: LoginResponseType): LoginActionType => ({
  type: LOGIN,
  payload: {
    token: data ? data.token : '',
    user: data ? data.user : { firstName: '', lastName: '', _id: '', role: [], img: '', isOnline: true, scrollPosition: null, }
  },
})

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
        dispatch(login(data))
        dispatch(push('/'))
      })

      .catch((data) => data.json().then((d: LoginErrorsMessagesType) => dispatch(setMessagesForLoginForm(d))))
  }
}

export function trySignIn(): ThunkType {
  return (dispatch) => {
    fetch('/api/v1/auth/trySignIn')
      .then((r) => r.json())
      .then((data) => {
        dispatch(login(data))
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
        dispatch(login())
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

export type LoginReducerTypes =
  UpdateFirstNameActionType
  | UpdateLastNameActionType
  | UpdateEmailActionType
  | UpdatePasswordActionType
  | SetMessageForLoginFormActionType
  | LoginActionType
