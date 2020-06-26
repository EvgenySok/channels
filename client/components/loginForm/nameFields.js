import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateFirstName, updateLastName } from '../../redux/reducers/loginActions'

const NameFields = () => {
  const dispatch = useDispatch()
  const loginReducer = useSelector((state) => state.loginReducer)
  const { firstName, lastName, messages } = loginReducer

  const [firstNameErr] = ['firstName'].map((it) => messages.find((i) => i.param === it))

  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
          First Name
        </label>
        <input
          className={`${
            firstNameErr ? 'border-red-500' : 'border-gray-200'
          } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          id="grid-first-name"
          type="text"
          placeholder="Jane"
          value={firstName}
          onChange={(e) => dispatch(updateFirstName(e.target.value.trim()))}
        />
        {firstNameErr ? (
          <p className="text-red-500 text-xs italic">{firstNameErr.msg}</p>
        ) : (
          <p className="text-gray-600 text-xs italic">Please fill out this field.</p>
        )}
      </div>
      <div className="w-full md:w-1/2 px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
          Last Name
        </label>
        <input
          className="border-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-last-name"
          type="text"
          placeholder="Doe"
          value={lastName}
          onChange={(e) => dispatch(updateLastName(e.target.value.trim()))}
        />
      </div>
    </div>
  )
}

export default NameFields
