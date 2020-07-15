import React from 'react'

import Sidebar from '../components/sidebar/_sideBar'
import TopBar from '../components/topBar'
import ChatMessages from '../components/chatMessages'
import InputMessage from '../components/inputMessage'

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
          <InputMessage />
        </div>
      </div>
    </div>
  )
}

export default Home
