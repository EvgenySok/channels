import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { signIn, loginActions } from '../../redux/reducers/loginActions'

type PropsType = {
  isLoginForm: boolean
  setIsLoginForm: (arg: boolean) => void
}

const FooterLoginForm: FC<PropsType> = ({ isLoginForm, setIsLoginForm }) => {
  const dispatch = useDispatch()
  return (
    <div className="footer">
      <button className="button-blue" type="button" onClick={() => dispatch(signIn())}>
        Sign In
      </button>
      <a
        className="link"
        onClick={() => {
          setIsLoginForm(!isLoginForm)
          dispatch(loginActions.setMessagesForLoginForm([{ msg: '', param: '' }]))
        }}
        href="#"
      >
        Go to register form
      </a>
      <a className="link" href="#">
        Forgot Password?
      </a>
    </div>
  )
}

export default FooterLoginForm
