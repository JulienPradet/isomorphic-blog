import React from 'react'
import Form from './../ui/form/Form'

export default class Logout extends React.Component {
  login(values) {
    this.props.AuthActions.logout(values);
  }

  render() {
    const buttons = [
      {
        id: 'logout',
        type: 'submit',
        label: 'Logout'
      }
    ];

    const fields = [];

    return (
      <Form method="POST" action="/logout" fields={fields} buttons={buttons} onSubmit={this.login.bind(this)} ></Form>
    );
  }
}
