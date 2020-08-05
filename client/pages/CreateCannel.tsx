import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createChannel } from '../redux/reducers/chatActions'

const SecretPage: React.FC  = () => {
  const dispatch = useDispatch()
  const [channelName, setChannelName] = useState<string>('')
  const [channeldiscription, setChanneldiscription] = useState<string>('')

  const sendForm = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(createChannel({ name: channelName, description: channeldiscription }))
    setChannelName('')
    setChanneldiscription('')
  }

  return (
    <div className="login-body">
      <form className="login-form">
        <div className="email">
          <label className="login-form__label" htmlFor="grid-email">
            Channel name
          </label>
          <input
            className="login-form__input"
            id="grid-email"
            type="text"
            placeholder="name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>
        <div className="email">
          <label className="login-form__label" htmlFor="grid-email">
            Channel discription
          </label>
          <input
            className="login-form__input"
            id="grid-email"
            type="text"
            placeholder="discription"
            value={channeldiscription}
            onChange={(e) => setChanneldiscription(e.target.value)}
          />
        </div>

        <div className="footer">
          <button className="button-blue" type="button" onClick={sendForm}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}

export default SecretPage
