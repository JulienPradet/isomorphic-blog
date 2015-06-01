import React from 'react'
import Panel from '../ui/Panel'
import UserStatus from './UserStatus'
import UsersList from './UsersList'

import { bindData } from '../../bindData'
import AuthFetchers from '../../fetchers/AuthFetchers'

class AuthManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.context.stores.auth.getUser(),
      users: this.props.context.stores.auth.getUsers()
    };
  }

  _resetState() {
    this.setState({
      user: this.props.context.stores.auth.getUser(),
      users: this.props.context.stores.auth.getUsers()
    });
  }

  _onChange() {
    this._resetState();
  }

  componentDidMount() {
    this.props.context.stores.auth.addChangeListener(this._onChange.bind(this));
    this.props.context.actions.auth.loadUsers();
  }

  componentWillUnmount() {
    this.props.context.stores.auth.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    return (
      <div>
        <Panel type="full" size={10}>
            <UserStatus user={this.state.user} />
        </Panel>

        <Panel size={10}>
            <UsersList users={this.state.users} />
        </Panel>
      </div>
    );
  }
}

export default bindData(
  AuthManager,
  {
    auth: {
      users: AuthFetchers.refreshUsers
    }
  }
);
