import React from 'react'

const InputMessage = () => {
  const channel = {
    name: '#general',
  }

  return (
    <div>
      <div className="flex m-6 rounded-lg border-2 border-grey overflow-hidden">
        <span className="text-3xl text-grey px-3 border-r-2 border-grey">+</span>
        <input type="text" className="w-full px-4" placeholder={`Message to ${channel}`} />
      </div>
    </div>
  )
}
export default InputMessage
