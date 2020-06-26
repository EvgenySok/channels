import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateEmail } from '../../redux/reducers/loginActions'

const EmailField = () => {
  const dispatch = useDispatch()
  const loginReducer = useSelector((state) => state.loginReducer)
  const { email, messages } = loginReducer

  const [emailErr] = ['email'].map((it) => messages.find((i) => i.param === it))

  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
          E-mail
        </label>
        <input
          className={`${
            emailErr ? 'border-red-500' : 'border-gray-200'
          } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          id="grid-email"
          type="text"
          placeholder="e-mail"
          value={email}
          onChange={(e) => dispatch(updateEmail(e.target.value.trim()))}
        />
        {emailErr ? (
          <p className="text-red-500 text-xs italic">{emailErr.msg}</p>
        ) : (
          <p className="text-gray-600 text-xs italic">Enter your email</p>
        )}
      </div>
    </div>
  )
}

export default EmailField
