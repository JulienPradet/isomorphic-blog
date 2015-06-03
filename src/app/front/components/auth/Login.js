import React from 'react'
import Form from './../ui/form/Form'

export default class Login extends React.Component {
  login(values) {
    this.props.AuthActions.login(values);
  }

  render() {
    const fields = [
      {
        id: 'username',
        label: "Username",
        type: 'text'
      },
      {
        id: 'password',
        label: "Password",
        type: 'password'
      }
    ];
    const buttons = [
      {
        id: 'signin',
        type: 'submit',
        label: 'Sign in'
      }
    ];

    return (
      <Form method="POST" action="/login" fields={fields} buttons={buttons} onSubmit={this.login.bind(this)} ></Form>
    );
  }
}
