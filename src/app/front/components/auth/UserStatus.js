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

  render() {
    let content;
    if(typeof this.props.user === "undefined" || typeof this.props.user.username === "undefined") {
      return (
        <Panel type="full">
          Welcome to my blog !
          <Login AuthActions={this.props.context.actions.auth} />
          <Link to="login">{"Se connecter"}</Link> <Link to="register">{"S'inscrire"}</Link>
        </Panel>
      );
    } else {
      return (
        <Panel type="full">
          Hello <Link to="userStatus"><Username user={this.props.user} /></Link> !
          <Link to="logout">Logout</Link>
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
      user: AuthFetchers.refreshUser
    }
  }
);
