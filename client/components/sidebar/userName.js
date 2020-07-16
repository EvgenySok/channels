import React from 'react'

const UserName = () => {
  const member = { isOnline: true }
  return (
    <div className="sidebar__user-name">
      <span className={`dot ${member.isOnline ? 'dot__online' : ''}`} />
      <span className="">Olivia</span>
    </div>
  )
}
export default UserName
