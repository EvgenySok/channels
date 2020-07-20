import React from 'react'
import { useSelector } from 'react-redux'
// import marked from 'marked'

const ChatMessages = () => {
  const { messages, currentChannel } = useSelector((state) => state.chatReducer)
  const { _id } = currentChannel

  return typeof messages[_id] === 'undefined' ? (
    <div className="chat-messages"> No posts yet </div>
  ) : (
    <div className="chat-messages">
      {messages[_id].map((message) => (
        <div className="message" key={message._id}>
          <img src={message.img} alt={message.user} />
          <div className="message__content">
            <div className="">
              <span className="message__content__name">{message.name}</span>
              <span className="message__content__time">{new Date(message.time).toLocaleString()}</span>
            </div>
            {/* <div className="message__content__text">{marked(message.text)}</div> */}
            <div className="message__content__text" dangerouslySetInnerHTML={{ __html: message.text }}/>
          </div>
        </div>
      ))}
    </div>
  )
}
export default ChatMessages
