import FetchData from '../fetchData.js'

export default {
  refreshUser: function refreshUser() {
    return FetchData.users.getUsers()
      .then(function(users) {
        if(users.length > 0) {
          _user = users[0];
        } else {
          _user = {};
        }
        return _user;
      });
  },

  refreshUsers: function refreshUsers() {
    return FetchData.users.getUsers();
  },

  register: function register(user) {
    return FetchData.auth.register(user);
  },

  login: function login(user) {
    return FetchData.auth.login(user)
  },

  logout: function logout() {
    return FetchData.auth.logout();
  }
};
