import React from 'react'
import Router from 'react-router'
import App from './app'
import Home from './components/Home'
import Register from './components/auth/Register'
import UsersList from './components/auth/UsersList'

let Route = Router.Route
  , DefaultRoute = Router.DefaultRouter
  , createRoute = Router.createRoute
  , location = Router.HistoryLocation;

let routes = (
  <Route path="/" handler={App}>
    <Route name="Register" path="/register" handler={Register} />
    <DefaultRoute handler={Home}/>
  </Route>
);

export default {
  routes,
  location
}
