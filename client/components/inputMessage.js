import React, { useState } from 'react'

const InputMessage = () => {
  const [input, setInput] = useState('')

  const channel = {
    name: '#general',
  }

  const controlInput = (e) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  const sendMessage = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (input.trim()) {
        console.log('Send message!!!')
        setInput('')
      }
    }
  }

  return (
    <div>
      <div className="flex m-6 rounded-lg border-2 border-blue-300 overflow-hidden">
        <span
          className="text-3xl text-grey px-3 border-r-2 border-blue-300 focus:outline-none focus:bg-blue-300"
          role="button"
          tabIndex={0}
          onClick={sendMessage}
          onKeyDown={sendMessage}
        >
          +
        </span>
        <input
          type="text"
          className="w-full px-4 focus:outline-none focus:bg-blue-300"
          placeholder={`Message to ${channel.name}`}
          value={input}
          onChange={controlInput}
          onKeyDown={sendMessage}
        />
      </div>
    </div>
  )
}
export default InputMessage
