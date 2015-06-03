import React from 'react'
import Form from './../ui/form/Form'

export default class Register extends React.Component {
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
      },
      {
        id: 'email',
        label: "Email",
        type: 'email',
        defaultValue: 'a@a.ac'
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
      <Form method="POST" action="/register" fields={fields} buttons={buttons} onSubmit={this.props.onRegister} ></Form>
    );
  }
}
