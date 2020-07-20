import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect } from 'react-router-dom'

import configureStore, { history } from './redux/configStore'
// import getSocket from './redux/configSocket'

import Startup from './startup'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import CreateCannel from './pages/CreateCannel'

const store = configureStore()
// getSocket()

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authed = useSelector((s) => s.loginReducer)
  const func = (props) =>
    !!authed.user.firstName && !!authed.token ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />
  return <Route {...rest} render={func} />
}

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Startup>
          <Switch>
            <PrivateRoute exact path="/" component={() => <Home />} />
            <Route exact path="/login" component={() => <LoginPage />} />
            <PrivateRoute exact path="/createCannel" component={() => <CreateCannel />} />
            <Route component={() => <Home />} />
          </Switch>
        </Startup>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
