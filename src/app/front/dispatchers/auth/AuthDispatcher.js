import Dispatcher from '../Dispatcher'

export default AuthDispatcher = new Dispatcher();

AuthDispatcher.handleNewUserAction = function(user) {
  this.dispatch({
    actionType: 'LOGIN',
    user: user
  });
}
