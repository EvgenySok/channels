import React from 'react'
import { useSelector } from 'react-redux'

const UserName = () => {
  const member = { isOnline: true }
  const { firstName } = useSelector((store) => store.loginReducer.user)

  return (
    <div className="sidebar__user-name">
      <span className={`dot ${member.isOnline ? 'dot__online' : ''}`} />
      <span className="">{firstName}</span>
    </div>
  )
}
export default UserName
