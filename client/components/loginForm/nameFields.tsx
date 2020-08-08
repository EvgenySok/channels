import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

import { loginActions, } from '../../redux/reducers/loginActions'
import { useTypedSelector } from '../../redux/configStore'

const NameFields: FC = () => {
  const dispatch = useDispatch()
  const loginReducer = useTypedSelector((state) => state.loginReducer)
  const { firstName, lastName, messages } = loginReducer

  const [firstNameErr] = ['firstName'].map((it) => messages.find((i) => i.param === it))

  return (
    <div className="name-fields">
      <div className="first-name">
        <label className="login-form__label" htmlFor="grid-first-name">
          First Name
        </label>
        <input
          className={`${firstNameErr ? 'error-border' : ''} login-form__input`}
          id="grid-first-name"
          type="text"
          placeholder="Jane"
          value={firstName}
          onChange={(e) => dispatch(loginActions.updateFirstName(e.target.value.trim()))}
        />
        {firstNameErr ? (
          <p className="login-form__bottom-text error-text">{firstNameErr.msg}</p>
        ) : (
            <p className="login-form__bottom-text">Please fill out this field.</p>
          )}
      </div>
      <div className="last-name">
        <label className="login-form__label" htmlFor="grid-last-name">
          Last Name
        </label>
        <input
          className="login-form__input"
          id="grid-last-name"
          type="text"
          placeholder="Doe"
          value={lastName}
          onChange={(e) => dispatch(loginActions.updateLastName(e.target.value.trim()))}
        />
      </div>
    </div>
  )
}

export default NameFields
