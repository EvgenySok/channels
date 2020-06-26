import {
  UPDATE_FIRST_NAME_FIELD,
  UPDATE_LAST_NAME_FIELD,
  UPDATE_PASSWORD_FIELD,
  UPDATE_EMAIL_FIELD,
  LOGIN,
  // CHANGE_ERRORS,
  SET_MESSAGE_FOR_LOGIN_FORM,
} from './types'

export const updateFirstName = (firstName) => ({
  type: UPDATE_FIRST_NAME_FIELD,
  payload: firstName,
})

export const updateLastName = (lastName) => ({
  type: UPDATE_LAST_NAME_FIELD,
  payload: lastName,
})

export const updateEmail = (email) => ({
  type: UPDATE_EMAIL_FIELD,
  payload: email,
})

export const updatePassword = (password) => ({
  type: UPDATE_PASSWORD_FIELD,
  payload: password,
})

export const setMessages = (err) => ({
  type: SET_MESSAGE_FOR_LOGIN_FORM,
  payload: err,
})

export const register = () => {
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
        dispatch(setMessages(data))
        dispatch(updatePassword(''))
      })
      .catch((data) => data.json().then((d) => dispatch(setMessages(d))))
  }
}

export const signIn = () => {
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
      .then((data) => {
        dispatch({
          type: LOGIN,
          payload: {
            token: data.token,
            user: {
              firstName: data.firstName,
              lastName: data.lastName,
            },
          },
        })
      })
      .catch((data) => data.json().then((d) => dispatch(setMessages(d))))
  }
}

export function trySignIn() {
  return (dispatch) => {
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
            },
          },
        })
        // history.push('/private')
      })
      .catch((e) => e)
  }
}