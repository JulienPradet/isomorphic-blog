import React from 'react'
import User from './Username'

import { bindData } from '../../bindData'
import AuthFetchers from '../../fetchers/AuthFetchers'

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.context.stores.auth.getUsers()
    };
  }

  _resetState() {
    this.setState({
      users: this.props.context.stores.auth.getUsers()
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
    let users = this.state.users.map(function(user) {
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

export default bindData(
  'UsersList',
  UsersList,
  {
    auth: {
      users: AuthFetchers.refreshUsers
    }
  }
);
