import Store from './Store'

export default class AuthStore extends Store {
  constructor(dispatchers, constants, initData) {
    if(typeof initData === "undefined") {
      initData = {
        user: {},
        users: []
      };
    }

    super(
      dispatchers.auth,
      constants,
      function(payload) {
        let actionType = payload.actionType;
        switch(actionType) {
          case constants.auth.REFRESH_CURRENT_USER:
            store.set('user', payload.user);
            UsersStore.emitChange();
            break;
          case constants.auth.REFRESH_CURRENT_USERS:
            store.set('users', payload.users);
            UsersStore.emitChange();
            break;
        }
      },
      initData
    );
  }

  getUser() {
    return this._user;
  }

  getUsers() {
    return this._users;
  }
}
