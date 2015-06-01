import Actions from './Actions'
import fetchers from '../fetchers/AuthFetchers'

export default class AuthActions {
  constructor(dispatchers, constants) {
    this.dispatchers = dispatchers;
    this.constants = constants;
  }

  loadUser() {
    const dispatchers = this.dispatchers;
    fetchers.refreshUser()
      .then(function(user) {
        dispatchers.auth.handleRefreshCurrentUser(user);
      })
      .catch(function(error) {
        dispatchers.auth.handleFailedLoadUser(error);
      })
      .done();
  }

  loadUsers() {
    const dispatchers = this.dispatchers;
    fetchers.refreshUsers()
      .then(function(users) {
        dispatchers.auth.handleRefreshCurrentUsers(users);
      })
      .catch(function(error) {
        dispatchers.auth.handleFailedLoadUsers(error);
      })
      .done();
  }

  register(user) {
    const dispatchers = this.dispatchers;
    fetchers.register(user)
      .then(function(user) {
        dispatchers.auth.handleRefreshCurrentUser(user);
      })
      .catch(function(error) {
        dispatchers.auth.handleFailedRegister(error);
      })
      .done();
  }

  login(user) {
    const dispatchers = this.dispatchers;
    fetchers.login(user)
      .then(function(user) {
        dispatchers.auth.handleRefreshCurrentUser(user);
      })
      .catch(function(error) {
        dispatchers.auth.handleFailedLogin(error);
      })
      .done();
  }

  logout() {
    const dispatchers = this.dispatchers;
    fetchers.logout()
      .then(function(user) {
        dispatchers.auth.handleRefreshCurrentUser(user);
      })
      .catch(function(error) {
        dispatchers.auth.handleFailedLogout(error);
      })
      .done();
  }
}
