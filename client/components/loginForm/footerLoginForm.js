import React from 'react'
import { useDispatch } from 'react-redux'
import { signIn, setMessages } from '../../redux/reducers/loginActions'

const FooterLoginForm = ({ isLoginForm, setIsLoginForm }) => {
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
          dispatch(setMessages([]))
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
