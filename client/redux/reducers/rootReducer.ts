import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import loginReducer from './loginReducer'
import chatReducer from './chatReducer'

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    chatReducer,
    loginReducer,
  })

export default rootReducer
