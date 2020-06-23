import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { listReducer } from './listReducer'
import loginReducer from './loginReducer'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    loginReducer,
    list: listReducer
  })

export default createRootReducer
