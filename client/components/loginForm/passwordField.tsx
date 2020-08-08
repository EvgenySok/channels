import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { loginActions } from '../../redux/reducers/loginActions'
import { useTypedSelector } from '../../redux/configStore'

const PasswordField: FC = () => {
  const dispatch = useDispatch()
  const loginReducer = useTypedSelector((state) => state.loginReducer)
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
          onChange={(e) => dispatch(loginActions.updatePassword(e.target.value.trim()))}
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
