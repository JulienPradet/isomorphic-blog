import React from 'react'
import Router from 'react-router'

import Register from './auth/Register'
import AuthManager from './auth/AuthManager'
import Panel from './ui/Panel'

let Route = Router.Route
  , DefaultRoute = Router.DefaultRoute
  , createRoute = Router.createRoute
  , RouteHandler = Router.RouteHandler
  , Link = Router.Link;

export class App extends React.Component {
  render() {
    return (
      <Panel size={10}>
        <Panel size={3}>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <AuthManager context={this.props.context} />
        </Panel>
        <Panel size={7}>
          <RouteHandler context={this.props.context} />
        </Panel>
      </Panel>
    );
  }
}

function refreshUser() {
  return FetchData.users.getUsers()
    .then(function(users) {
      if(users.length > 0) {
        _user = users[0];
      } else {
        _user = {};
      }
      UsersStore.emitChange();
    })
    .fail(function(status, response) {
      console.log("ERROR "+status+": "+response);
    });
}

function refreshUsers() {
  return FetchData.users.getUsers()
    .then(function(users) {
      _users = users;
      UsersStore.emitChange();
    })
    .fail(function(status, response) {
      console.log("ERROR "+status+": "+response);
    })
}

export let location = Router.HistoryLocation;

export let routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="register" path="register" handler={Register} />
    <DefaultRoute handler={AuthManager} />
  </Route>
);
