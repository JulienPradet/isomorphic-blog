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
    let key;

    this.constants = {
      auth: AuthConstants()
    };

    this.dispatchers = {
      auth: AuthDispatcher(this.constants)
    };

    this.actions = {
      auth: AuthActions(this.dispatchers, this.constants)
    };

    this.stores = {
      auth: new AuthStore(this.dispatchers, this.constants)
    };
  }

  setInitData(initData) {
    for(var moduleName in initData) {
      for(var dataName in initData[moduleName]) {
        this.stores[moduleName]['_'+dataName] = initData[moduleName][dataName];
      }
    }
  }
};
