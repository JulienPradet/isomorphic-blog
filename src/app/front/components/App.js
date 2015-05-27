import React from 'react'
import AuthManager from './auth/AuthManager'
import Panel from './ui/Panel'

export default class App extends React.Component {
  render() {
    console.log(this.props.context.stores.auth);
    return (
      <Panel size={10}>
        <Panel size={3}>
          <AuthManager AuthActions={this.props.context.actions.auth} AuthStore={this.props.context.stores.auth} />
        </Panel>
      </Panel>
    );
  }
}
