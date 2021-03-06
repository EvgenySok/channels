import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { chatActions } from '../../redux/reducers/chatActions'
import { useTypedSelector } from '../../redux/configStore'

const UsersList: FC = () => {
  const dispatch = useDispatch()
  const { users, currentChannel } = useTypedSelector((store) => store.chatReducer)
  const { _id } = useTypedSelector((store) => store.loginReducer.user)

  return (
    <>
      {users.map((member) => (
        <div
          key={member._id}
          className={`${currentChannel._id === member._id ? 'current-channel' : ''} sidebar__user-name`}
        >
          <a
            href="#"
            onClick={() =>
              dispatch(
                chatActions.updateCurrentChannel({
                  scrollPosition: member.scrollPosition,
                  _id: member._id,
                  name: member.firstName,
                  description: `private chat with ${member.firstName} ${
                    typeof member.lastName === null ? '' : member.lastName
                    }`,
                })
              )
            }
          >
            <span className={`dot ${member.isOnline ? 'dot__online' : ''}`} />
            <span>
              {`${member.firstName} ${typeof member.lastName === 'undefined' ? '' : member.lastName}`}
              {_id === member._id ? <i className="">(me)</i> : ''}
            </span>
          </a>
        </div>
      ))}
    </>
  )
}
export default UsersList
