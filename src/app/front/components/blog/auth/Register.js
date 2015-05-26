import React from 'react'
import Form from './../../ui/form/Form'

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
        type: 'text'
      },
      {
        id: 'email',
        label: "Email",
        type: 'text',
        defaultValue: "test@gmail.com"
      }
    ];

    return (
      <Form method="POST" action="/register" fields={fields}></Form>
    );
  }
}
