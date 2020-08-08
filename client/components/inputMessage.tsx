import React, { MouseEvent, ClipboardEvent, KeyboardEvent, FC } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { useDispatch } from 'react-redux'
// @ts-ignore
import htmlToMarkdown from 'html-to-markdown'

import { updateCurrentMessage } from '../redux/reducers/chatActions'
import { createWebSocketMessage } from '../redux/reducers/socketActions'
import { useTypedSelector } from '../redux/configStore'

const InputMessage: FC = () => {
  const dispatch = useDispatch()
  const currentMessage = useTypedSelector((state) => state.chatReducer.currentMessage)

  const handleChange = (e: ContentEditableEvent) => {
    dispatch(updateCurrentMessage(htmlToMarkdown.convert(e.target.value)))
  }

  const createMessage = (e: KeyboardEvent<HTMLDivElement> & MouseEvent) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (currentMessage.trim()) {
        dispatch(createWebSocketMessage(currentMessage))
      }
    }
  }

  const onKeyDown = (e: KeyboardEvent) =>
    e.ctrlKey || (e.metaKey && ![`c`, `v`, `ArrowLeft`, `ArrowRight`].includes(e.key) && e.preventDefault())

  const onPaste = (e: ClipboardEvent) => {
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
