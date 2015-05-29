import EventEmitter from 'events'
import FetchData from '../fetchData'

function AuthStore(dispatchers, constants) {
  let _user = {};
  let _users = [];

  function addUser(user) {
    if(_users.every(function(user) {
      return user.username != user.username;
    })) {
      _users.push(user);
    }
  }

  function removeUser(user) {
    for(let index in user) {
      if(user.hasOwnProperty[index] && user[index].id === user.id) {
        _users.splice(index, 1);
        break;
      }
    }
  }

  let UsersStore = new EventEmitter();

  UsersStore.getUser = function() {
    return _user;
  }

  UsersStore.getUsers = function() {
    return _users;
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
      case constants.auth.REFRESH_CURRENT_USER:
        _user = payload.user;
        UsersStore.emitChange();
        break;
      case constants.auth.REFRESH_CURRENT_USERS:
        _users = payload.users;
        UsersStore.emitChange();
        break;
    }
  });

  return UsersStore;
}

export default AuthStore;
