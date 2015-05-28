import React from 'react'
import User from './User'
import Register from './Register'

export default class UserStatus extends React.Component {
  render() {
    if(typeof this.props.user === "undefined" || typeof this.props.user.username === "undefined") {
      return (
        <Register />
      );
    } else {
      return (
        <User user={this.props.user} />
      );
    }
  }
}
