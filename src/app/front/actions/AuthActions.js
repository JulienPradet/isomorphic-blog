import FetchData from '../fetchData.js'

function refreshUser() {
  return FetchData.users.getUsers()
    .then(function(users) {
      if(users.length > 0) {
        _user = users[0];
      } else {
        _user = {};
      }
      return _user;
    });
}

function refreshUsers() {
  return FetchData.users.getUsers();
}

function register(user) {
  return FetchData.auth.register(user);
}

function login(user) {
  return FetchData.auth.login(user)
}

function logout() {
  return FetchData.auth.logout();
}

function AuthActions(dispatchers, constants) {
  return {
    loadUser: function() {
      refreshUser()
        .then(function(user) {
          dispatchers.auth.handleRefreshCurrentUser(user);
        })
        .fail(function(status, error) {
          dispatchers.auth.handleFailedLoadUser(status, error);
        })
        .done();
      dispatchers.auth.handleLoadingUser()
    },
    loadUsers: function() {
      refreshUsers()
        .then(function(users) {
          dispatchers.auth.handleRefreshCurrentUsers(users);
        })
        .fail(function(status, error) {
          dispatchers.auth.handleFailedLoadUsers(status, error);
        })
        .done();
      dispatchers.auth.handleLoadingUsers()
    },
    register: function(user) {
      register(user)
        .then(function(user) {
          dispatchers.auth.handleRefreshCurrentUser(user);
        })
        .fail(function(status, error) {
          dispatchers.auth.handleFailedRegister(status, error);
        })
        .done();
      dispatchers.auth.handleLoadingRegister()
    },
    login: function(user) {
      login(user)
        .then(function(user) {
          dispatchers.auth.handleRefreshCurrentUser(user);
        })
        .fail(function(status, error) {
          dispatchers.auth.handleFailedLogin(status, error);
        })
        .done();
      dispatchers.auth.handleLoadingLogin()
    },
    logout: function() {
      logout()
        .then(function(user) {
          dispatchers.auth.handleRefreshCurrentUser(user);
        })
        .fail(function(status, error) {
          dispatchers.auth.handleFailedLogout(status, error);
        })
        .done();
      dispatchers.auth.handleLoadingLogout()
    }
  };
}

export default AuthActions;
