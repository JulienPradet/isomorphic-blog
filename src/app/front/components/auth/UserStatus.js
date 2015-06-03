import React from 'react'
import User from './User'
import Register from './Register'

export default class UserStatus extends React.Component {
  register(values) {
    this.props.context.actions.auth.register(values);
  }

  render() {
    if(typeof this.props.user === "undefined" || typeof this.props.user.username === "undefined") {
      return (
        <Register onRegister={this.register.bind(this)} />
      );
    } else {
      return (
        <User user={this.props.user} />
      );
    }
  }
}
