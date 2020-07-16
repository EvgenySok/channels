import React from 'react'

const ChannelsTitle = () => {
  const addChannel = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      console.log('addChannel !')
    }
  }

  return (
    <div className="sidebar__channels-title">
      <div className="channels-header">Channels</div>
      <div
        className="channels-add"
        role="button"
        tabIndex={0}
        onClick={addChannel}
        onKeyDown={addChannel}
      >
        <svg className="" viewBox="0 0 20 20">
          <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
        </svg>
      </div>
    </div>
  )
}
export default ChannelsTitle
