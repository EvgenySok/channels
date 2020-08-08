import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { configureStore, MiddlewareArray, ThunkAction, Action } from '@reduxjs/toolkit'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import rootReducer from './reducers/rootReducer'
import socketMiddleware from './socketMiddleware'

export const history = createBrowserHistory()

// const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const store = configureStore({
  reducer: rootReducer(history),
  // middleware: new MiddlewareArray().concat((routerMiddleware(history), socketMiddleware(), thunk))
  middleware: [routerMiddleware(history), socketMiddleware(), thunk] as const
})
export default store

export type RootStateType = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootStateType> = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, Action<string>>