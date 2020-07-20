import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateCurrentChannel } from '../../redux/reducers/chatActions'

const UsersList = () => {
  const dispatch = useDispatch()
  const { users, currentChannel } = useSelector((store) => store.chatReducer)
  const { userId } = useSelector((store) => store.loginReducer.user)

  return (
    <div>
      {users.map((member) => (
        <div
          key={member._id}
          className={`${currentChannel._id === member._id ? 'current-channel' : ''} sidebar__user-name`}
        >
          <a
            href="#"
            onClick={() =>
              dispatch(
                updateCurrentChannel({
                  _id: member._id,
                  name: member.firstName,
                  description: `private chat with ${member.firstName} ${
                    typeof member.lastName === 'undefined' ? '' : member.lastName
                  }`,
                })
              )
            }
          >
            <span className={`dot ${member.isOnline ? 'dot__online' : ''}`} />
            <span>
              {`${member.firstName} ${typeof member.lastName === 'undefined' ? '' : member.lastName}`}
              {userId === member._id ? <i className="">(me)</i> : ''}
            </span>
          </a>
        </div>
      ))}
    </div>
  )
}
export default UsersList
