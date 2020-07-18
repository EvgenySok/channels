import React from 'react'
import ContentEditable from 'react-contenteditable'
import { useDispatch, useSelector } from 'react-redux'
import htmlToMarkdown from 'html-to-markdown'

import { updateCurrentMessage } from '../redux/reducers/messageActions'
import { sendWebSocketMessage } from '../redux/reducers/socketActions'

const InputMessage = () => {
  const dispatch = useDispatch()
  const currentMessage = useSelector((state) => state.messageReducer.currentMessage)

  const handleChange = (e) => {
    dispatch(updateCurrentMessage(htmlToMarkdown.convert(e.target.value)))
  }

  const sendMessage = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (currentMessage.trim()) {
        dispatch(sendWebSocketMessage(currentMessage))
      }
    }
  }

  const onKeyDown = (e) =>
    e.ctrlKey || (e.metaKey && ![`c`, `v`, `ArrowLeft`, `ArrowRight`].includes(e.key) && e.preventDefault())

  const onPaste = (e) => {
    console.log(e)
    dispatch(updateCurrentMessage(e.target.value))
  }
  return (
    <div className="input-message">
      <div className="input-message__button" role="button" tabIndex={0} onClick={sendMessage} onKeyDown={sendMessage}>
        +
      </div>

      <div className="chat-input-wrapper">
        <ContentEditable
          className="chat-input"
          html={currentMessage}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
        />
      </div>
    </div>
  )
}
export default InputMessage
