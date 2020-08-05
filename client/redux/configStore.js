import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import createRootReducer from './reducers/rootReducer'
import socketMiddleware from './socketMiddleware'

export const history = createBrowserHistory()

const rootReducer=createRootReducer(history)

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeFunc(applyMiddleware(routerMiddleware(history), socketMiddleware(), thunk))
  )
  return store
}
