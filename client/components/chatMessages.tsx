import React, { useLayoutEffect, useRef, RefObject, UIEvent, FC } from 'react'
import DOMPurify from 'dompurify'
import { useDispatch } from 'react-redux'
import { chatActions } from '../redux/reducers/chatActions'
import { useTypedSelector } from '../redux/configStore'
// import marked from 'marked'

const ChatMessages: FC = () => {
  const dispath = useDispatch()
  const clean = DOMPurify.sanitize
  const { messages, currentChannel } = useTypedSelector((state) => state.chatReducer)
  const { _id, scrollPosition } = currentChannel
  const currentMessages = messages[_id]

  // const [scrollPosition, setScrollPosition] = useState(null)
  const messagesScrollRef = useRef<HTMLDivElement>(null)
  console.log('messagesScrollRef:', messagesScrollRef.current)

  useLayoutEffect(() => {
    if (messagesScrollRef.current) {
      if (scrollPosition === null) {
        messagesScrollRef.current.scrollTop = messagesScrollRef.current.scrollHeight
      } else {
        messagesScrollRef.current.scrollTop = scrollPosition
      }
    }
  }, [currentMessages])

  const elementScrollData = (e: UIEvent<HTMLElement>) => {
    e.persist()
    dispath(chatActions.updateChannelScrollPosition(_id, +e.currentTarget.scrollTop.toFixed(0)))
  }

  return typeof currentMessages === 'undefined' ? (
    <div className="chat-messages"> No posts yet </div>
  ) : (
      <div className="chat-messages" onScroll={elementScrollData} ref={messagesScrollRef}>
        {currentMessages.map((message) => (
          <div className="message" key={message._id}>
            <img src={message.img} alt={message.user} />
            <div className="message__content">
              <div className="">
                <span className="message__content__name">{message.user}</span>
                <span className="message__content__time">{new Date(message.time).toLocaleString()}</span>
              </div>
              <div className="message__content__text" dangerouslySetInnerHTML={{ __html: clean(message.text) }} />
            </div>
          </div>
        ))}
        {/* <div ref={messagesScrollRef} /> */}
      </div>
    )
}
export default ChatMessages
