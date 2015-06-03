import React from 'react'
import { RouteHandler } from 'react-router'
import Panel from '../ui/Panel'

import { bindData } from '../../bindData'
import AuthFetchers from '../../fetchers/AuthFetchers'

class AuthManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.context.stores.auth.getUsers(),
      user: this.props.context.stores.auth.getUser()
    };
  }

  _resetState() {
    this.setState({
      users: this.props.context.stores.auth.getUsers(),
      user: this.props.context.stores.auth.getUser()
    });
  }

  _onChange() {
    this._resetState();
  }

  componentDidMount() {
    this.props.context.stores.auth.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    this.props.context.stores.auth.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    return (
      <RouteHandler AuthActions={this.props.context.actions.auth} user={this.state.user} users={this.state.users} />
    );
  }
}

export default bindData(
  'AuthManager',
  AuthManager,
  {
    auth: {
      users: AuthFetchers.refreshUsers,
      user: AuthFetchers.refreshUser
    }
  }
);
