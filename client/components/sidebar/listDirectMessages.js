import React from 'react'

const ListDirectMessages = () => {
  const arrayDirectMessages = [
    {
      isOnlin: true,
      name: 'Olivia Dunham',
      isMe: true,
      id: 0,
    },
    {
      isOnlin: true,
      name: 'Adam Bishop',
      isMe: false,
      id: 1,
    },
    {
      isOnlin: false,
      name: 'killgt',
      isMe: false,
      id: 2,
    },
  ]

  return (
    <div>
      {arrayDirectMessages.map((member) => (
        <div key={member.id} className="flex items-center mb-3 px-4">
          <span className={`${member.isOnlin ? 'bg-green-400' : 'border'} rounded-full block w-2 h-2 mr-2`} />
          <span className="text-purple-300">
            {member.name}
            {member.isMe ? <i className="text-grey text-sm">(me)</i> : ''}
          </span>
        </div>
      ))}
    </div>
  )
}
export default ListDirectMessages
