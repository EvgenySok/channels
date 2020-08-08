import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { register, loginActions } from '../../redux/reducers/loginActions'

type PropsType = {
  isLoginForm: boolean
  setIsLoginForm: (arg: boolean) => void
}

const FooterRegistrForm: FC<PropsType> = ({ isLoginForm, setIsLoginForm }) => {
  const dispatch = useDispatch()
  return (
    <>
      <div className="footer">
        <button
          className="button-blue"
          type="button"
          onClick={() => dispatch(register())}
        >
          Sign Up
      </button>
        <a
          className="link"
          onClick={() => {
            setIsLoginForm(!isLoginForm)
            dispatch(loginActions.setMessagesForLoginForm([]))
          }}
          href="#"
        >
          Go to login form
      </a>
      </div>
    </>
  )
}

export default FooterRegistrForm
