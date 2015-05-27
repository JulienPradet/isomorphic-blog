import React from 'react'

export default class User extends React.Component {
  render() {
    return (
      <div className="user">
        {this.props.user.username}
      </div>
    );
  }
}
