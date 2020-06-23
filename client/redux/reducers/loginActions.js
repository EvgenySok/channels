import {
  UPDATE_FIRST_NAME_FIELD,
  UPDATE_LAST_NAME_FIELD,
  UPDATE_PASSWORD_FIELD,
  UPDATE_EMAIL_FIELD,
  LOGIN,
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

export const signIn = () => {
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
        console.log('NOT error', data)
        dispatch({
          type: LOGIN,
          payload: data.token,
        })
      })
      .catch((data) => data.json())
      .then((data) => console.log('error', data))
  }
}
