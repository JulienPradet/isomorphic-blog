import FetchData from '../fetchData.js'

export default {
  getCurrentUser: function getCurrentUser() {
    return FetchData.auth.currentUser();
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
