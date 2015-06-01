import Dispatcher from './Dispatcher'

export default class AuthDispatcher extends Dispatcher {
  constructor(constants) {
    super();
    this.constants = constants;
  }

  /* Refresh User */
  handleRefreshCurrentUser(user) {
    this.dispatch({
      actionType: this.constants.auth.REFRESH_CURRENT_USER,
      user: user
    });
  }

  handleFailedLoadUser(status, error) {
    this.dispatch({
      actionType: this.constants.auth.FAILED_LOADING_USER,
      status: status,
      error: error
    });
  }

  /* Refresh users */
  handleRefreshCurrentUsers(users) {
    this.dispatch({
      actionType: this.constants.auth.REFRESH_CURRENT_USERS,
      users: users
    });
  }

  handleFailedLoadUsers(status, error) {
    this.dispatch({
      actionType: this.constants.auth.FAILED_LOADING_USERS,
      status: status,
      error: error
    });
  }

  /* Register User */
  handleFailedRegister(status, error) {
    this.dispatch({
      actionType: this.constants.auth.FAILED_REGISTER,
      status: status,
      error: error
    });
  }

  /* Login */
  handleFailedLogin(status, error) {
    this.dispatch({
      actionType: this.constants.auth.FAILED_LOGIN,
      status: status,
      error: error
    });
  }

  /* Logout */
  handleFailedLogout(status, error) {
    this.dispatch({
      actionType: this.constants.auth.FAILED_LOGOUT,
      status: status,
      error: error
    });
  }
}
