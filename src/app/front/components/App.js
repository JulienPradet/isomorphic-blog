import React from 'react'
import Router from 'react-router'

import UserStatus from './auth/UserStatus'
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
            </ul>
          </Panel>
          <UserStatus context={this.props.context} />
        </Panel>
        <Panel size={7}>
          <RouteHandler context={this.props.context} />
        </Panel>
      </Panel>
    );
  }
}
