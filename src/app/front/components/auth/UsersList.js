import React from 'react'
import UsersStore from '../../stores/auth/UsersStore'
import AuthActions from '../../actions/auth/AuthActions'

export default class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: UsersStore.getUser(),
      activeUsers: UsersStore.getActiveUsers()
    };
  }

  _resetState() {
    this.state = {
      user: UsersStore.getUser(),
      activeUsers: UsersStore.getActiveUsers()
    };
  }

  _onChange() {
    _resetState();
  }

  componentDidMount() {
    UsersStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UsersStore.removeChangeListener(this._onChange);
  }

  render() {
    <div className="users">
      <h1>Active users</h1>
      <ul>
        {this.state.activeUsers.map(function(user) { return (<li>{user.username}</li>); })}
      </ul>
      <button onClick={this._onAddClick}>New user</button>
    </div>
  }

  _onAddClick() {
    AuthActions.addUser();
  }
}
