import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import loginReducer from './loginReducer'
import messageReducer from './messageReducer'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    messageReducer,
    loginReducer,
  })

export default createRootReducer
