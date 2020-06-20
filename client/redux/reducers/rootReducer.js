import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { listReducer } from './listReducer'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    list: listReducer
  })

export default createRootReducer
