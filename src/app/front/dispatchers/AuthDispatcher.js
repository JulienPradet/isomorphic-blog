import Dispatcher from './Dispatcher'

function dispatchError(dispatcher, actionType) {
  return function(status, error) {
    dispatcher.dispatch({
      actionType: actionType,
      status: status,
      error: error
    });
  }
}

function AuthDispatcher(constants) {
  let dispatcher = new Dispatcher();

  /* Refresh User */
  dispatcher.handleRefreshCurrentUser = function(user) {
    this.dispatch({
      actionType: constants.auth.REFRESH_CURRENT_USER,
      user: user
    });
  }

  dispatcher.handleFailedLoadUser = dispatchError(
    this,
    constants.auth.FAILED_LOADING_USER
  );

  /* Refresh users */
  dispatcher.handleRefreshCurrentUsers = function(users) {
    this.dispatch({
      actionType: constants.auth.REFRESH_CURRENT_USERS,
      users: users
    })
  }

  dispatcher.handleFailedLoadUsers = dispatchError(
    this,
    constants.auth.FAILED_LOADING_USERS
  );

  /* Register User */
  dispatcher.handleFailedRegister = dispatchError(
    this,
    constants.auth.FAILED_REGISTER
  );

  /* Login */
  dispatcher.handleFailedLogin = dispatchError(
    this,
    constants.auth.FAILED_LOGIN
  );

  /* Logout */
  dispatcher.handleFailedLogout = dispatchError(
    this,
    constants.auth.FAILED_LOGOUT
  );

  return dispatcher;
}

export default AuthDispatcher;
