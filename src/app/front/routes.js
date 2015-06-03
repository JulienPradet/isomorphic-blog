import React from 'react'
import Router from 'react-router'

import App from './components/App'

import AuthManager from './components/auth/AuthManager'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'

import UsersList from './components/auth/UsersList'

let Route = Router.Route
  , DefaultRoute = Router.DefaultRoute
  , Redirect = Router.Redirect;

export let location = Router.HistoryLocation;

export let routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="auth" handler={AuthManager}>
      <Route name="register" path="/register" handler={Register} />
      <Route name="login" path="/login" handler={Login} />
      <Route name="logout" path="/logout" handler={Logout} />
    </Route>
    <DefaultRoute handler={UsersList} />
  </Route>
);
