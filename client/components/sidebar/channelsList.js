import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateCurrentChannel } from '../../redux/reducers/messageActions'

const ChannelsList = () => {
  const dispatch = useDispatch()
  const { channels, currentChannel } = useSelector((store) => store.messageReducer)

  return channels.map((channel) => (
    // channel = [channelId, name, description]
    <div
      key={channel[0]}
      className={`${currentChannel.channelId === channel[0] ? 'current-channel' : ''} channels-list`}
    >
      <a href="#" onClick={() => dispatch(updateCurrentChannel(channel))}>
        {currentChannel.channelId === channel[0] ? <span className="">#</span> : ''} {channel[1]}
      </a>
    </div>
  ))
}
export default ChannelsList
