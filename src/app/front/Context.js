import q from 'q'

import AuthConstants from './constants/AuthConstants'
import AuthActions from './actions/AuthActions'
import AuthDispatcher from './dispatchers/AuthDispatcher'
import AuthStore from './stores/AuthStore'


/*
 * The goal of this file is to init the context of the App in order to avoid
 * conflicts between two apps (especially on the server side)
 */

export default class Context {
  constructor() {
    this.constants = {
      auth: AuthConstants()
    };

    this.dispatchers = {
      auth: new AuthDispatcher(this.constants)
    };

    this.actions = {
      auth: new AuthActions(this.dispatchers, this.constants)
    };

    this.stores = {
      auth: new AuthStore(this.dispatchers, this.constants)
    };
  }

  setInitData(initData) {
    for(var moduleName in initData) {
      this.stores[moduleName].setInitData(initData[moduleName]);
    }
  }
};
