import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import loginReducer from './loginReducer'
import chatReducer from './chatReducer'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    chatReducer,
    loginReducer,
  })

export default createRootReducer
