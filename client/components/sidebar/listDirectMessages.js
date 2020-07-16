import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateCurrentChannel } from '../../redux/reducers/messageActions'

const ListDirectMessages = () => {
  const dispatch = useDispatch()
  const { users, currentChannel } = useSelector((store) => store.messageReducer)
  const { userId } = useSelector((store) => store.loginReducer.user)

  return (
    <div>
      {users.map((member) => (
        <div
          key={member.id}
          className={`${currentChannel.channelId === member.id ? 'current-channel' : ''} sidebar__user-name`}
        >
          <a
            href="#"
            onClick={() =>
              dispatch(
                updateCurrentChannel([
                  member.id,
                  member.firstName,
                  `private chat with ${member.firstName} ${member.lastName}`,
                ])
              )
            }
          >
            <span className={`dot ${member.isOnline ? 'dot__online' : ''}`} />
            <span>
              {`${member.firstName} ${typeof member.lastName === 'undefined' ? '' : member.lastName}`}
              {userId === member.id ? <i className="">(me)</i> : ''}
            </span>
          </a>
        </div>
      ))}
    </div>
  )
}
export default ListDirectMessages
