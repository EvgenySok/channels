import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateCurrentChannel } from '../../redux/reducers/messageActions'

const ChannelsList = () => {
  const dispatch = useDispatch()
  const { channels, currentChannel } = useSelector((store) => store.messageReducer)

  return channels.map((channel) => (
    <div key={channel._id} className={`${currentChannel._id === channel._id ? 'current-channel' : ''} channels-list`}>
      <a href="#" onClick={() => dispatch(updateCurrentChannel(channel))}>
        {currentChannel.channelId === channel._id ? <span className="">#</span> : ''} {channel.name}
      </a>
    </div>
  ))
}
export default ChannelsList
