import React from 'react'
import { Link } from 'react-router'
import Panel from '../ui/Panel'

import Login from './Login'
import Username from './Username'
import Register from './Register'

import { bindData } from '../../bindData'
import AuthFetchers from '../../fetchers/AuthFetchers'

class UserStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.context.stores.auth.getUser()
    };
  }

  _resetState() {
    this.setState({
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

  refreshUser() {
    this.props.context.actions.auth.loadCurrentUser(this.state.token);
  }

  render() {
    let content;

    const refreshUser = <button type="button" onClick={this.refreshUser.bind(this)}>Refresh User</button>;

    if(typeof this.state.user === "undefined" || typeof this.state.user.username === "undefined") {
      return (
        <Panel type="full">
          Welcome to my blog !
          <Login AuthActions={this.props.context.actions.auth} />
          <Link to="login">{"Se connecter"}</Link> <Link to="register">{"S'inscrire"}</Link>
          {refreshUser}
        </Panel>
      );
    } else {
      return (
        <Panel type="full">
          Hello <Link to="logout"><Username user={this.state.user} /></Link> !
          <Link to="logout">Logout</Link>
          {refreshUser}
        </Panel>
      )
    }
  }
}

export default bindData(
  'UsersStatus',
  UserStatus,
  {
    auth: {
      users: AuthFetchers.getCurrentUser
    }
  }
);
