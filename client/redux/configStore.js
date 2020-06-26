import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import rootReducer from './reducers/rootReducer'

export const history = createBrowserHistory()

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer(history),
    preloadedState,
    composeFunc(applyMiddleware(routerMiddleware(history), thunk))
  )
  return store
}
