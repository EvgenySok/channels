import React from 'react'

import Sidebar from './sideBar'
import TopBar from './topBar'
import ChatMessages from './chatMessages'
import InputMessage from './inputMessage'
import LoginForm from './loginForm'

const Home = () => {
  // const dispatch = useDispatch()

  // if (store.productList[0] === undefined) {
  //   dispatch(uploadProductList(dispatch))
  // }

  return (
    <div className="w-full border shadow">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="w-full flex flex-col">
          <TopBar />
          <ChatMessages />
          <LoginForm />
          <InputMessage />
        </div>
      </div>
    </div>
  )
}

export default Home
