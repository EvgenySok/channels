import React from 'react'
import { useDispatch } from 'react-redux'
import { register, setMessagesForLoginForm } from '../../redux/reducers/loginActions'

const FooterRegistrForm = ({ isLoginForm, setIsLoginForm }) => {
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
            dispatch(setMessagesForLoginForm([]))
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
