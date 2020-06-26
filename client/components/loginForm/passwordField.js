import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatePassword } from '../../redux/reducers/loginActions'

const PasswordField = () => {
  const dispatch = useDispatch()
  const loginReducer = useSelector((state) => state.loginReducer)
  const { password, messages } = loginReducer

  const [passwordErr, messageSuccessRegistr] = ['password', 'success'].map((it) => messages.find((i) => i.param === it))

  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          Password
        </label>
        <input
          className={`${
            passwordErr ? 'border-red-500' : 'border-gray-200'
          } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          id="grid-password"
          type="password"
          placeholder="******************"
          value={password}
          onChange={(e) => dispatch(updatePassword(e.target.value.trim()))}
        />
        {passwordErr ? (
          <p className="text-red-500 text-xs italic">{passwordErr.msg}</p>
        ) : (
          <p className="text-gray-600 text-xs italic">Enter password</p>
        )}
        {messageSuccessRegistr ? <p className="text-green-500 text-xl italic">{messageSuccessRegistr.msg}</p> : ''}
      </div>
    </div>
  )
}

export default PasswordField
