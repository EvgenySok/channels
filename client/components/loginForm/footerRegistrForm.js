import React from 'react'
import { useDispatch } from 'react-redux'
import { register, setMessages } from '../../redux/reducers/loginActions'

const FooterRegistrForm = ({ isLoginForm, setIsLoginForm }) => {
  const dispatch = useDispatch()
  return (
    <div className="flex items-center justify-between">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => dispatch(register())}
      >
        To register
      </button>
      <a
        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        onClick={() => {
          setIsLoginForm(!isLoginForm)
          dispatch(setMessages([]))
        }}
        href="#"
      >
        Go to login form
      </a>
    </div>
  )
}

export default FooterRegistrForm
