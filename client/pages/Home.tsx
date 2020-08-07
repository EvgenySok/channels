import React from 'react'
// @ts-ignore
import Sidebar from '../components/sidebar/_sideBar'
import TopBar from '../components/topBar'
// @ts-ignore
import ChatMessages from '../components/chatMessages'
// @ts-ignore
import InputMessage from '../components/inputMessage'

const Home: React.FC  = () => {
  // const dispatch = useDispatch()

  // if (store.productList[0] === undefined) {
  //   dispatch(uploadProductList(dispatch))
  // }

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
