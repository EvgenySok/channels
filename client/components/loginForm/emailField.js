import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateEmail } from '../../redux/reducers/loginActions'

const EmailField = () => {
  const dispatch = useDispatch()
  const loginReducer = useSelector((state) => state.loginReducer)
  const { email, messages } = loginReducer

  const [emailErr] = ['email'].map((it) => messages.find((i) => i.param === it))

  return (
    <>
      <div className="email">
        <label className="login-form__label" htmlFor="grid-email">
          E-mail
        </label>
        <input
          className={`${
            emailErr ? 'error-border' : ''} login-form__input`}
          id="grid-email"
          type="text"
          placeholder="e-mail"
          value={email}
          onChange={(e) => dispatch(updateEmail(e.target.value.trim()))}
        />
        {emailErr ? (
          <p className="login-form__bottom-text error-text">{emailErr.msg}</p>
        ) : (
          <p className="login-form__bottom-text">Enter your email</p>
        )}
      </div>
    </>
  )
}

export default EmailField
