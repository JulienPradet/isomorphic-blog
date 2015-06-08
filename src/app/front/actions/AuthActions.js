import Actions from './Actions'
import fetchers from '../fetchers/AuthFetchers'
import { setToken } from '../fetchData'

export default class AuthActions {
  constructor(dispatchers, constants) {
    this.dispatchers = dispatchers;
    this.constants = constants;
  }

  loadCurrentUser() {
    const dispatchers = this.dispatchers;
    fetchers.getCurrentUser()
      .then(function(user) {
        dispatchers.auth.handleRefreshCurrentUser(data.user);
      })
      .catch(function(error) {
        dispatchers.auth.handleFailedLoadCurrentUser(error);
      })
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
      .then(function(data) {
        console.log(setToken);
        setToken(data.token);
        dispatchers.auth.handleRefreshCurrentUser(data.user);
      })
      .catch(function(error) {
        dispatchers.auth.handleFailedLogin(error);
      })
      .done();
  }

  logout() {
    const dispatchers = this.dispatchers;
    fetchers.logout()
      .then(function() {
        dispatchers.auth.handleRefreshCurrentUser();
        setToken(null);
      })
      .catch(function(error) {
        dispatchers.auth.handleFailedLogout(error);
      })
      .done();
  }
}
