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

  handleFailedLoadUsers(error) {
    this.dispatch({
      actionType: this.constants.auth.FAILED_LOADING_USERS,
      error: error
    });
  }

  /* Register User */
  handleFailedRegister(error) {
    this.dispatch({
      actionType: this.constants.auth.FAILED_REGISTER,
      error: error
    });
  }

  /* Login */
  handleFailedLogin(error) {
    this.dispatch({
      actionType: this.constants.auth.FAILED_LOGIN,
      error: error
    });
  }

  /* Logout */
  handleFailedLogout(error) {
    this.dispatch({
      actionType: this.constants.auth.FAILED_LOGOUT,
      error: error
    });
  }
}
