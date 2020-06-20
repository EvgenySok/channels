import React from 'react'

import Sidebar from './sideBar'
import TopBar from './topBar'
import ChatMessages from './chatMessages'
import InputMessage from './inputMessage'
// import { useDispatch, useSelector } from 'react-redux'

// import { uploadProductList } from '../redux/reducers/actions'

const Home = () => {
  // const dispatch = useDispatch()
  // const store = useSelector((state) => state.list)

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

// Home.propTypes = {}

export default Home
