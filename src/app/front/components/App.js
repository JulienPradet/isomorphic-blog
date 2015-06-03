import React from 'react'
import Router from 'react-router'

import Register from './auth/Register'
import AuthManager from './auth/AuthManager'
import Panel from './ui/Panel'

let RouteHandler = Router.RouteHandler
  , Link = Router.Link;

export default class App extends React.Component {
  render() {
    return (
      <Panel size={10}>
        <Panel size={3}>
          <Panel size={10} type="full">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </Panel>
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
    .catch(function(status, response) {
      console.log("ERROR "+status+": "+response);
    });
}

function refreshUsers() {
  return FetchData.users.getUsers()
    .then(function(users) {
      _users = users;
      UsersStore.emitChange();
    })
    .catch(function(status, response) {
      console.log("ERROR "+status+": "+response);
    })
}
