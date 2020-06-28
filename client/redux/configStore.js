import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import createRootReducer from './reducers/rootReducer'
import socketMiddleware from './socketMiddleware'

export const history = createBrowserHistory()

const isBrowser = typeof window !== 'undefined'
const urlForSocket = `${isBrowser ? window.location.origin : `http://localhost:${process.env.PORT}`}/socket.io`

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeFunc(applyMiddleware(routerMiddleware(history), socketMiddleware(urlForSocket), thunk))
  )
  return store
}
