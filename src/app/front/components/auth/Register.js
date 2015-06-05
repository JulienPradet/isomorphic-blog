import React from 'react'
import Form from './../ui/form/Form'

export default class Register extends React.Component {
  register(values) {
    this.props.AuthActions.register(values);
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
        id: 'signup',
        type: 'submit',
        label: 'Sign up'
      }
    ];

    return (
      <Form method="POST" action="/register" fields={fields} errors={this.props.AuthStore.getRegisterErrors()} buttons={buttons} onSubmit={this.register.bind(this)} ></Form>
    );
  }
}
