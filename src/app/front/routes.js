import React from 'react'
import Router from 'react-router'

import App from './components/App'
import UserStatus from './components/auth/UserStatus'
import UsersList from './components/auth/UsersList'

let Route = Router.Route
  , DefaultRoute = Router.DefaultRoute;

export let location = Router.HistoryLocation;

export let routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="register" path="register" handler={UserStatus} />
    <DefaultRoute handler={UsersList} />
  </Route>
);
