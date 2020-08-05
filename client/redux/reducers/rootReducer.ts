import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import loginReducer from './loginReducer'
import chatReducer from './chatReducer'
// ------------
const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    chatReducer,
    loginReducer,
  })

export default createRootReducer

export type RootState = ReturnType<typeof createRootReducer>
