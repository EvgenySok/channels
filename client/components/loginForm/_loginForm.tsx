import React, { useState, FC } from 'react'
import NameFields from './nameFields'
import FooterLoginForm from './footerLoginForm'
import FooterRegistrForm from './footerRegistrForm'
import EmailField from './emailField'
import PasswordField from './passwordField'

const LoginForm: FC = () => {

  const [isLoginForm, setIsLoginForm] = useState(true)

  return (
    <>
      <form className="login-form">
        {isLoginForm ? '' : <NameFields />}
        <EmailField />
        <PasswordField />
        {isLoginForm ?
          <FooterLoginForm isLoginForm={isLoginForm} setIsLoginForm={setIsLoginForm} />
          :
          <FooterRegistrForm isLoginForm={isLoginForm} setIsLoginForm={setIsLoginForm} />
        }
      </form>
    </>
  )
}

export default LoginForm
