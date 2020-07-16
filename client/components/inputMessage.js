import React from 'react'
import ContentEditable from 'react-contenteditable'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentMessage, saveMessage } from '../redux/reducers/messageActions'

const InputMessage = () => {
  const dispatch = useDispatch()
  const currentMessage = useSelector((state) => state.messageReducer.currentMessage)

  const handleChange = (e) => {
    dispatch(updateCurrentMessage(e.target.value))
  }

  const sendMessage = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (currentMessage.trim()) {
        console.log('console:', currentMessage)
        dispatch(saveMessage(currentMessage))
      }
    }
  }

  return (
    <div className="input-message">
      <div className="input-message__button" role="button" tabIndex={0} onClick={sendMessage} onKeyDown={sendMessage}>
        +
      </div>

      <div className="chat-input-wrapper">
        <ContentEditable className="chat-input" html={currentMessage} onChange={handleChange} />
      </div>
    </div>
  )
}
export default InputMessage
