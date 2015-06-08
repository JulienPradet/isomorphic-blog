import Store from './Store'

export default class AuthStore extends Store {
  constructor(dispatchers, constants) {
    super(
      dispatchers.auth,
      constants,
      function(payload) {
        let actionType = payload.actionType;
        switch(actionType) {
          case this.constants.auth.NEW_TOKEN:
            this._token = payload.token;
            this.emitChange();
            break;
          case this.constants.auth.REFRESH_CURRENT_USER:
            this._user = payload.user;
            this.emitChange();
            break;
          case this.constants.auth.REFRESH_CURRENT_USERS:
            this._users = payload.users;
            this.emitChange();
            break;
          case this.constants.auth.FAILED_REGISTER:
            this._registerError = payload.error;
            this.emitChange();
            break;
        }
      }
    );

    this.setInitData({
      user: {},
      users: [],
      _registerError: {}
    });
  }

  getUser() {
    return this._user;
  }

  getUsers() {
    return this._users;
  }

  getRegisterErrors() {
    return this._registerError;
  }
}
