import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatePassword } from '../../redux/reducers/loginActions'

const PasswordField = () => {
  const dispatch = useDispatch()
  const loginReducer = useSelector((state) => state.loginReducer)
  const { password, messages } = loginReducer

  const [passwordErr, messageSuccessRegistr] = ['password', 'success'].map((it) => messages.find((i) => i.param === it))

  return (
    <>
      <div className="password">
        <label className="login-form__label" htmlFor="grid-password">
          Password
        </label>
        <input
          className={`${passwordErr ? 'error-border' : ''} login-form__input`}
          id="grid-password"
          type="password"
          placeholder="******************"
          value={password}
          onChange={(e) => dispatch(updatePassword(e.target.value.trim()))}
        />
        {passwordErr ? (
          <p className="login-form__bottom-text error-text">{passwordErr.msg}</p>
        ) : (
          <p className="login-form__bottom-text">Enter password</p>
        )}
        {messageSuccessRegistr ? <p className="login-form__bottom-text saccess-text">{messageSuccessRegistr.msg}</p> : ''}
      </div>
    </>
  )
}

export default PasswordField
