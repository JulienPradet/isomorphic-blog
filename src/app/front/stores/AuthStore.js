import Store from './Store'

export default class AuthStore extends Store {
  constructor(dispatchers, constants) {
    super(
      dispatchers.auth,
      constants,
      function(payload) {
        let actionType = payload.actionType;
        switch(actionType) {
          case this.constants.auth.REFRESH_CURRENT_USER:
            this._user = payload.user;
            this.emitChange();
            break;
          case this.constants.auth.REFRESH_CURRENT_USERS:
            this._users = payload.users;
            this.emitChange();
            break;
        }
      }
    );

    this.setInitData({
      user: {},
      users: []
    });
  }

  getUser() {
    return this._user;
  }

  getUsers() {
    return this._users;
  }
}
