import Dispatcher from './Dispatcher'

function AuthDispatcher(constants) {
  let dispatcher = new Dispatcher();

  dispatcher.handleNewUserAction = function(user) {
    this.dispatch({
      actionType: constants.auth.LOGIN,
      user: user
    });
  };

  return dispatcher;
}

export default AuthDispatcher;
