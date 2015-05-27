function AuthActions(dispatchers, constants) {
  return {
    addUser: function(user) {
      dispatchers.auth.handleNewUserAction(user)
    }
  };
}

export default AuthActions;
