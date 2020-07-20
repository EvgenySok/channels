import React from 'react'
import ContentEditable from 'react-contenteditable'
import { useDispatch, useSelector } from 'react-redux'
import htmlToMarkdown from 'html-to-markdown'

import { updateCurrentMessage } from '../redux/reducers/chatActions'
import { createWebSocketMessage } from '../redux/reducers/socketActions'

const InputMessage = () => {
  const dispatch = useDispatch()
  const currentMessage = useSelector((state) => state.chatReducer.currentMessage)

  const handleChange = (e) => {
    dispatch(updateCurrentMessage(htmlToMarkdown.convert(e.target.value)))
  }

  const createMessage = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (currentMessage.trim()) {
        dispatch(createWebSocketMessage(currentMessage))
      }
    }
  }

  const onKeyDown = (e) =>
    e.ctrlKey || (e.metaKey && ![`c`, `v`, `ArrowLeft`, `ArrowRight`].includes(e.key) && e.preventDefault())

  const onPaste = (e) => {
    console.log(e)
    // dispatch(updateCurrentMessage(e.target.value))
  }
  return (
    <div className="input-message">
      <div className="input-container">
        <div
          className="input-message__button"
          role="button"
          tabIndex={0}
          onClick={createMessage}
          onKeyDown={createMessage}
        >
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
    </div>
  )
}
export default InputMessage
