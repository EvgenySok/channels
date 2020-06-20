import React from 'react'

const UsersName = () => {
  const member = { isOnline: true }
  return (
    <div className="flex items-center mb-6 px-4">
      <span className={`${member.isOnlin ? 'bg-green-400' : 'border'} rounded-full block w-2 h-2 mr-2`} />
      <span className="text-purple-300">Olivia</span>
    </div>
  )
}
export default UsersName
