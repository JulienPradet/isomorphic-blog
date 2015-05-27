import React from 'react'
import User from './User'

export default class UsersList extends React.Component {
  render() {
    let users = this.props.users.map(function(user) {
      return (<li key={user.username}><User user={user} /></li>);
    });

    return (
      <div className="users">
        <h1>Active users</h1>
        <ul>
          {users}
        </ul>
      </div>
    );
  }
}
