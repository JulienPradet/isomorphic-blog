import React from 'react'
import Router from 'react-router'

import * as context from './ContextProvider'

import Home from './components/Home'
import Register from './components/auth/Register'
import UsersList from './components/auth/UsersList'
import AuthManager from './components/auth/AuthManager'
import Panel from './components/ui/Panel'

let Route = Router.Route
  , DefaultRoute = Router.DefaultRoute
  , createRoute = Router.createRoute
  , location = Router.HashLocation
  , RouteHandler = Router.RouteHandler;

class App extends React.Component {
  render() {
    return (
        <Panel size={10}>
          <Panel size={3}>
            <AuthManager AuthActions={context.actions.auth} AuthStore={context.stores.auth} />
          </Panel>
          <Panel size={7}>
            <RouteHandler />
          </Panel>
        </Panel>
    );
  }
}

let routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="register" path="register" handler={Register} />
    <DefaultRoute handler={Home} />
  </Route>
);

let mountNode = document.getElementById("react-container");

Router.run(routes, location, function(Handler) {
  React.render(<Handler />, mountNode);
});
