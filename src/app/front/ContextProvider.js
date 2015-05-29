import AuthConstants from './constants/AuthConstants'
import AuthActions from './actions/AuthActions'
import AuthDispatcher from './dispatchers/AuthDispatcher'
import AuthStore from './stores/AuthStore'

/*
 * The goal of this file is to init the context of the App in order to avoid
 * conflicts between two apps (especially on the server side)
 */

export default class Context {
  constructor(initData) {
    this.constants = {
      auth: AuthConstants()
    };

    this.dispatchers = {
      auth: AuthDispatcher(this.constants)
    };

    this.actions = {
      auth: AuthActions(this.dispatchers, this.constants)
    };

    let stores = {
      auth: AuthStore
    };
    for(var storeName in stores) {
      if(typeof initData !== "undefined" && typeof initData[storeName] !== "undefined") {
        stores[storeName] = new stores[storeName](this.dispatchers, this.constants, initData[storeName]);
      } else {
        stores[storeName] = new stores[storeName](this.dispatchers, this.constants);
      }
    }
    this.stores = stores;
  }
}
