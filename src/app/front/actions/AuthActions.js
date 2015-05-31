import Actions from './Actions'
import fetchers from '../fetchers/AuthFetchers'

export default function AuthActions(dispatchers, constants) {
  return {
    loadUser: function() {
      return fetchers.refreshUser()
        .then(function(user) {
          dispatchers.auth.handleRefreshCurrentUser(user);
          return user;
        })
        .catch(function(status, error) {
          dispatchers.auth.handleFailedLoadUser(status, error);
        })
    },
    loadUsers: function() {
      return fetchers.refreshUsers()
        .then(function(users) {
          dispatchers.auth.handleRefreshCurrentUsers(users);
          return users;
        })
        .catch(function(status, error) {
          dispatchers.auth.handleFailedLoadUsers(status, error);
        })
    },
    register: function(user) {
      return fetchers.register(user)
        .then(function(user) {
          dispatchers.auth.handleRefreshCurrentUser(user);
          return user;
        })
        .catch(function(status, error) {
          dispatchers.auth.handleFailedRegister(status, error);
        })
    },
    login: function(user) {
      return fetchers.login(user)
        .then(function(user) {
          dispatchers.auth.handleRefreshCurrentUser(user);
          return user;
        })
        .catch(function(status, error) {
          dispatchers.auth.handleFailedLogin(status, error);
        })
    },
    logout: function() {
      return fetchers.logout()
        .then(function(user) {
          dispatchers.auth.handleRefreshCurrentUser(user);
          return user;
        })
        .catch(function(status, error) {
          dispatchers.auth.handleFailedLogout(status, error);
        })
    }
  }
}
