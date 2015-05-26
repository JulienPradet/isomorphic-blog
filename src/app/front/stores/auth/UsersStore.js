import EventEmitter from 'events'
import AuthDispatcher from '../../dispatchers/auth/AuthDispatcher'

let _user = {};
let _activeUsers = [];

function logIn(user) {
  _user = user;
  addActiveUser(user);
}

function logOut() {
  _user = {};
  removeActiveUser(user);
}

function addActiveUser(user) {
  _activeUser.push(user);
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

UsersStore.getActiveUsers = function() {
  return _activeUsers;
}

UsersStore.emitChange = function() {
  this.emit(CHANGE_EVENT);
}

UsersStore.addChangeListener = function(callback) {
  this.on(CHANGE_EVENT, callback);
}

UsersStore.removeChangeListener = function(callback) {
  this.removeListener(CHANGE_EVENT, callback);
}

dispatcherIndex = AuthDispatcher.register(function(payload) {
  let actionType = payload.actionType;
  switch(actionType) {
    case 'LOGIN_SELF':
      logIn(action.user);
      UsersStore.emitChange();
      break;
    case 'LOGOUT_SELF':
      LogOut(action.user);
      UsersStore.emitChange();
      break;
    case 'LOGIN':
      addActiveUser(action.user);
      UsersStore.emitChange();
      break;
    case 'LOGOUT':
      removeActiveUser(action.user);
      UsersStore.emitChange();
      break;
  }
});
