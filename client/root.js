import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect } from 'react-router-dom'

import configureStore, { history } from './redux/configStore'
// import getSocket from './redux/configSocket'

import Home from './components/Home'
import SecretPage from './components/SecretPage'

import Startup from './startup'

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
            <Route exact path="/" component={() => <Home />} />
            <Route exact path="/login" component={() => <Home />} />
            <PrivateRoute exact path="/secret" component={() => <SecretPage />} />
            <Route component={() => <Home />} />
          </Switch>
        </Startup>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
