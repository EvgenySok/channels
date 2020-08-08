import React, { FC } from 'react'
import { useTypedSelector } from '../../redux/configStore'

const UserName: FC = () => {
  const { firstName, isOnline } = useTypedSelector((store) => store.loginReducer.user)

  return (
    <div className="sidebar__user-name">
      <span className={`dot ${isOnline ? 'dot__online' : ''}`} />
      <span className="">{firstName}</span>
    </div>
  )
}
export default UserName
