import EventEmitter from 'events'
import FetchData from '../fetchData'

function AuthStore(dispatchers, constants) {
  let _user = {};
  let _activeUsers = [];

  function refreshActiveUsers() {
    let activeUsers = [];
    FetchData.users.getActiveUsers()
      .then(function(users) {
        _activeUsers = users;
        UsersStore.emitChange();
      })
      .fail(function(status, response) {
        console.log("ERROR "+status+": "+response);
      })
      .done();

  }
  refreshActiveUsers();

  function addActiveUser(user) {
    if(_activeUsers.every(function(activeUser) {
      return activeUser.username != user.username;
    })) {
      _activeUsers.push(user);
    }
  }

  function removeActiveUser(user) {
    for(let index in user) {
      if(user.hasOwnProperty[index] && user[index].id === user.id) {
        _activeUsers.splice(index, 1);
        break;
      }
    }
  }

  let UsersStore = new EventEmitter();

  UsersStore.getUser = function() {
    return _user;
  }

  UsersStore.getUsers = function() {
    return _activeUsers;
  }

  UsersStore.emitChange = function() {
    this.emit(constants.auth.CHANGE_EVENT);
  }

  UsersStore.addChangeListener = function(callback) {
    this.on(constants.auth.CHANGE_EVENT, callback);
  }

  UsersStore.removeChangeListener = function(callback) {
    this.removeListener(constants.auth.CHANGE_EVENT, callback);
  }

  let dispatcherIndex = dispatchers.auth.register(function(payload) {
    let actionType = payload.actionType;
    switch(actionType) {
      case constants.auth.LOGIN:
        addActiveUser(payload.user);
        UsersStore.emitChange();
        break;
      case constants.auth.LOGOUT:
        removeActiveUser(payload.user);
        UsersStore.emitChange();
        break;
    }
  });

  return UsersStore;
}

export default AuthStore;
