import React from 'react'
import Sidebar from '../components/sidebar/_sideBar'
import TopBar from '../components/topBar'
import ChatMessages from '../components/chatMessages'
import InputMessage from '../components/inputMessage'


const Home: React.FC  = () => {
  return (
    <div className="main-div">
      <div className="main-page">
        <Sidebar />
        <div className="main-page__right">
          <TopBar />
          <ChatMessages />
          <InputMessage />
        </div>
      </div>
    </div>
  )
}

export default Home
