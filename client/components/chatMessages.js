import React, { useLayoutEffect, useRef } from 'react'
import DOMPurify from 'dompurify'
import { useSelector, useDispatch } from 'react-redux'
import { updateChannelScrollPosition } from '../redux/reducers/chatActions'
// import marked from 'marked'

const ChatMessages = () => {
  const dispath = useDispatch()
  const clean = DOMPurify.sanitize
  const { messages, currentChannel } = useSelector((state) => state.chatReducer)
  const { _id, scrollPosition } = currentChannel
  const currentMessages = messages[_id]

  // const [scrollPosition, setScrollPosition] = useState(null)
  const messagesEndRef = useRef('')
  console.log('messagesEndRef:', messagesEndRef.current)

  // const isLoadingOldMessages = false

  // useEffect(() => {
  //   console.log(
  //     'console go')
  //   if (messagesEndRef.current && (scrollPosition === null || scrollPosition >= 1)) {
  //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  //   }
  //   if (scrollPosition === 0 && isLoadingOldMessages === false) {
  //     // load old messages
  //   }
  //   if (messagesEndRef.current && scrollPosition === null) {
  //     console.log(
  //       'console go go go:',
  //       messagesEndRef.current,
  //       messagesEndRef.current.scrollTop,
  //       messagesEndRef.current.scrollHeight
  //     )
  //     messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
  //   }
  //   // }, 600)
  // }, [messagesEndRef, currentMessages, scrollPosition, isLoadingOldMessages])

  useLayoutEffect(() => {
    if (messagesEndRef.current) {
      if (scrollPosition === null) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
      } else {
        messagesEndRef.current.scrollTop = scrollPosition
      }
    }
  }, [currentMessages])

  const elementScrollData = (e) => {
    e.persist()
    dispath(updateChannelScrollPosition(_id, e.target.scrollTop.toFixed(0)))
  }

  return typeof currentMessages === 'undefined' ? (
    <div className="chat-messages"> No posts yet </div>
  ) : (
    <div className="chat-messages" onScroll={elementScrollData} ref={messagesEndRef}>
      {currentMessages.map((message) => (
        <div className="message" key={message._id}>
          <img src={message.img} alt={message.user} />
          <div className="message__content">
            <div className="">
              <span className="message__content__name">{message.name}</span>
              <span className="message__content__time">{new Date(message.time).toLocaleString()}</span>
            </div>
            <div className="message__content__text" dangerouslySetInnerHTML={{ __html: clean(message.text) }} />
          </div>
        </div>
      ))}
      {/* <div ref={messagesEndRef} /> */}
    </div>
  )
}
export default ChatMessages
