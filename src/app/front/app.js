import React from 'react'
import Router from 'react-router'
import routes from './routes'

import AuthManager from './components/auth/AuthManager'
import Panel from './components/ui/Panel'
import * as context from './ContextProvider'

let RouteHandler = Router.RouteHandler;

export default class App extends React.Component {
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

var mountNode = document.getElementById("react-container");

Router.run(routes.routes, routes.location, function(Handler, state) {
  React.render(<Handler />, mountNode);
});
