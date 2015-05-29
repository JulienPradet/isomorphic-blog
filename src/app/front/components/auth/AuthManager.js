import React from 'react'
import Panel from '../ui/Panel'
import UserStatus from './UserStatus'
import UsersList from './UsersList'

export default class AuthManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.context.stores.auth.getUser(),
      users: this.props.context.stores.auth.getUsers()
    };
  }

  getDataBindings() {
    return {
      user: this.props.context.stores.auth.refreshUser(),
      users: this.props.context.stores.auth.refreshUsers()
    }
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
