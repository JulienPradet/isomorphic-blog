import React from 'react'
import Router from 'react-router'

import Home from './Home'
import Register from './auth/Register'
import UsersList from './auth/UsersList'
import AuthManager from './auth/AuthManager'
import Panel from './ui/Panel'

let Route = Router.Route
  , DefaultRoute = Router.DefaultRoute
  , createRoute = Router.createRoute
  , RouteHandler = Router.RouteHandler;

export class App extends React.Component {
  render() {
    return (
        <Panel size={10}>
          <Panel size={3}>
            <a href="/">Home</a>
            <a href="/register">Register</a>
            <AuthManager AuthActions={this.props.context.actions.auth} AuthStore={this.props.context.stores.auth} />
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
    <DefaultRoute handler={Home} />
  </Route>
);
