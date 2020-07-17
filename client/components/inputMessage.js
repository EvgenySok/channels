import React from 'react'
import ContentEditable from 'react-contenteditable'
import { useDispatch, useSelector } from 'react-redux'
import htmlToText from 'html-to-text'
import htmlToMarkdown from 'html-to-markdown'


import { updateCurrentMessage, saveMessage } from '../redux/reducers/messageActions'

const InputMessage = () => {
  const dispatch = useDispatch()
  const currentMessage = useSelector((state) => state.messageReducer.currentMessage)

  const handleChange = (e) => {
    // const text = htmlToText.fromString(e.target.value, {
    //   format: {
    //     heading(elem, fn, options) {
    //       const h = fn(elem.children, options)
    //       return `====\n${h.toUpperCase()}\n====`
    //     },
    //   },
    // })

    dispatch(updateCurrentMessage(htmlToMarkdown.convert(e.target.value)))
  }

  const sendMessage = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (currentMessage.trim()) {
        dispatch(saveMessage(currentMessage))
      }
    }
  }

  const onKeyDown = (e) =>
    e.ctrlKey || (e.metaKey && ![`c`, `v`, `ArrowLeft`, `ArrowRight`].includes(e.key) && e.preventDefault())
  
  const onPaste = (e) => {
    console.log(e);
      dispatch(updateCurrentMessage(e.target.value))
}
  return (
    <div className="input-message">
      <div className="input-message__button" role="button" tabIndex={0} onClick={sendMessage} onKeyDown={sendMessage}>
        +
      </div>

      <div className="chat-input-wrapper">
        <ContentEditable className="chat-input" html={currentMessage} onChange={handleChange} onKeyDown={onKeyDown} onPaste={onPaste}/>
      </div>
    </div>
  )
}
export default InputMessage
