import AuthDispatcher from '../../dispatchers/auth/AuthDispatcher'

export let AuthActions = {
  addUser: function() {
    AuthDispatcher.handleNewUserAction({
      username: 'lalala'
    })
  }
}
