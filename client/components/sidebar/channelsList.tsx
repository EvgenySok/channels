import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { chatActions } from '../../redux/reducers/chatActions'
import { useTypedSelector } from '../../redux/configStore'

const ChannelsList: FC = () => {
  const dispatch = useDispatch()
  const { channels, currentChannel } = useTypedSelector((store) => store.chatReducer)

  return <> {
    channels.map((channel) => (
      <div key={channel._id} className={`${currentChannel._id === channel._id ? 'current-channel' : ''} channels-list`}>
        <a href="#" onClick={() => dispatch(chatActions.updateCurrentChannel(channel))}>
          {currentChannel._id === channel._id ? <span className="">#</span> : ''} {channel.name}
        </a>
      </div>
    ))}
  </>
}
export default ChannelsList
