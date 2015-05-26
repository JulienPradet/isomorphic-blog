module.exports = {
  fields: ['username', 'password', 'email'],
  validators: {
    username: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 32
      }
    },
    password: {
      presence: true,
      length: {
        minimum: 8
      }
    },
    email: {
      presence: true,
      email: true,
    }
  }
}
