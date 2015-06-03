import React from 'react'

export default class Username extends React.Component {
  render() {
    return (
      <div className="user">
        {this.props.user.username}
      </div>
    );
  }
}
