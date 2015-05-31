import React from 'react'
import Router from 'react-router'

import App from './components/App'
import Register from './components/auth/Register'
import AuthManager from './components/auth/AuthManager'

let Route = Router.Route
  , DefaultRoute = Router.DefaultRoute;

export let location = Router.HistoryLocation;

export let routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="register" path="register" handler={Register} />
    <DefaultRoute handler={AuthManager} />
  </Route>
);
