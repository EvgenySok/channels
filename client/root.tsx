import React, { Suspense } from 'react'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect } from 'react-router-dom'

import store, { history, useTypedSelector } from './redux/configStore'
// @ts-ignore
import Startup from './startup'
// import LoginPage from './pages/LoginPage'
const LoginPage = React.lazy(() => import(/*
  webpackChunkName: "LoginPage",
  webpackPrefetch: true
*/ './pages/LoginPage'))

// import CreateCannel from './pages/CreateCannel'
const CreateCannel = React.lazy(() => import(/*
  webpackChunkName: "CreateCannel",
  webpackPrefetch: true
*/ './pages/CreateCannel'))

// import Home from './pages/Home'
const Home = React.lazy(/*
  webpackChunkName: "Home",
  webpackPrefetch: true
*/ () => import('./pages/Home'))


const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const authed = useTypedSelector((s) => s.loginReducer)
  const func = (props: any) =>
    !!authed.user.firstName && !!authed.token ? <Component {...props} /> : <Component {...props} />  // <Redirect to={{ pathname: '/login' }} />
  return <Route {...rest} render={func} />
}

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Startup>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/login" component={LoginPage} />
              <PrivateRoute exact path="/createCannel" component={CreateCannel} />
              <Route component={() => <Home />} />
            </Switch>
          </Suspense>
        </Startup>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
