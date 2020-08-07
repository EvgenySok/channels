import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect } from 'react-router-dom'

import store, { history, useTypedSelector } from './redux/configStore'
// @ts-ignore
import Startup from './startup'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import CreateCannel from './pages/CreateCannel'

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const authed = useTypedSelector((s) => s.loginReducer)
  const func = (props: any) =>
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
