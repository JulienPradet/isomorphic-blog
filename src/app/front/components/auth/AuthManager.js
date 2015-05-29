import React from 'react'
import Panel from '../ui/Panel'
import UserStatus from './UserStatus'
import UsersList from './UsersList'

export default class AuthManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.AuthStore.getUser(),
      users: this.props.AuthStore.getUsers()
    };
  }

  getDataBindings() {
    return {
      user: this.props.AuthStore.refreshUser(),
      users: this.props.AuthStore.refreshUsers()
    }
  }

  _resetState() {
    this.setState({
      user: this.props.AuthStore.getUser(),
      users: this.props.AuthStore.getUsers()
    });
  }

  _onChange() {
    this._resetState();
  }

  componentDidMount() {
    this.props.AuthActions.loadUsers();
    this.props.AuthStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    this.props.AuthStore.removeChangeListener(this._onChange.bind(this));
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
