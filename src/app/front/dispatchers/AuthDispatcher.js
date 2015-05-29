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

  dispatcher.handleLoadingUser = function() {
    this.dispatch({
      actionType: constants.auth.LOADING_USER
    })
  }

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

  dispatcher.handleLoadingUsers = function() {
    this.dispatch({
      actionType: constants.auth.LOADING_USERS
    })
  }

  /* Register User */
  dispatcher.handleFailedRegister = dispatchError(
    this,
    constants.auth.FAILED_REGISTER
  );

  dispatcher.handleLoadingRegister = function() {
    this.dispatch({
      actionType: constants.auth.LOADING_REGISTER
    });
  }

  /* Login */
  dispatcher.handleFailedLogin = dispatchError(
    this,
    constants.auth.FAILED_LOGIN
  );

  dispatcher.handleLoadingLogin = function() {
    this.dispatch({
      actionType: constants.auth.LOADING_LOGIN
    });
  }

  /* Logout */
  dispatcher.handleFailedLogout = dispatchError(
    this,
    constants.auth.FAILED_LOGOUT
  );

  dispatcher.handleLoadingLogout = function() {
    this.dispatch({
      actionType: constants.auth.LOADING_LOGOUT
    });
  }

  return dispatcher;
}

export default AuthDispatcher;
