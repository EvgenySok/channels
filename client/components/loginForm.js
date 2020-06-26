/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import NameFields from './loginForm/nameFields'
import FooterLoginForm from './loginForm/footerLoginForm'
import FooterRegistrForm from './loginForm/footerRegistrForm'
import EmailField from './loginForm/emailField'
import PasswordField from './loginForm/passwordField'

const LoginForm = () => {

  const [isLoginForm, setIsLoginForm] = useState(true)

  return (
    <div className="flex justify-center h-full items-center">
      <form className="w-full max-w-lg border border-gray-200 flex-1">
        {isLoginForm ? '' : <NameFields />}
        <EmailField />
        <PasswordField />
        {isLoginForm ?
          <FooterLoginForm isLoginForm={isLoginForm} setIsLoginForm={setIsLoginForm} />
          :
          <FooterRegistrForm isLoginForm={isLoginForm} setIsLoginForm={setIsLoginForm} />
        }
      </form>
    </div>
  )
}

export default LoginForm
