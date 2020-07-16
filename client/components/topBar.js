import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../redux/reducers/loginActions'

const TopBar = () => {
  const { name, description } = useSelector((store) => store.messageReducer.currentChannel)
  const dispatch = useDispatch()

  const [inputSerch, setInputSearch] = useState('')

  const controlInput = (e) => {
    e.preventDefault()
    setInputSearch(e.target.value)
  }

  const startSearch = (e) => {
    if (e.key === 'Enter') {
      setInputSearch('')
    }
  }

  return (
    <div>
      <div className="top-bar">
        <div className="top-bar__titlel">
          <h2 className="top-bar__title__header">{name}</h2>
          <div className="top-bar__title__discrip">{description}</div>
        </div>
        <div className="top-bar__search">
          <input
            type="search"
            placeholder="Search"
            className="top-bar__search__input"
            value={inputSerch}
            onChange={controlInput}
            onKeyPress={startSearch}
          />
          <div className="top-bar__title__discrip">
            <a href="#" onClick={() => dispatch(signOut())}>
              Sign out
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TopBar
