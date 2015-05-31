import q from 'q'

import AuthConstants from './constants/AuthConstants'
import AuthActions from './actions/AuthActions'
import AuthDispatcher from './dispatchers/AuthDispatcher'
import AuthStore from './stores/AuthStore'

import AuthFetchers from './fetchers/AuthFetchers'


/*
 * The goal of this file is to init the context of the App in order to avoid
 * conflicts between two apps (especially on the server side)
 */

export class Context {
  constructor(request, callback) {
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

    let moduleName, dataName
      , promises = []
      , initData = {};

    for(moduleName in request) {
      initData[moduleName] = {};
      for(dataName in request[moduleName]) {
        if(typeof request[moduleName][dataName] === "function") {
          promises.push(
            request[moduleName][dataName]()
              .then(function() {
                initData[moduleName][dataName] = arguments[0];
              })
          );
        } else {
          initData[moduleName][dataName] = request[moduleName][dataName];
        }
      }
    }

    let stores = {
      auth: AuthStore
    };

    let _this = this;
    q.all(promises)
      .then(function() {
        for(var storeName in stores) {
          if(typeof initData !== "undefined" && typeof initData[storeName] !== "undefined") {
            stores[storeName] = new stores[storeName](_this.dispatchers, _this.constants, initData[storeName]);
          } else {
            stores[storeName] = new stores[storeName](_this.dispatchers, _this.constants);
          }
        }
        _this.stores = stores;

        callback(_this, initData);
      })
      .catch(function(error) {
        throw new Error(error);
      })
      .done();

  }
};

export function urlToRequest(url) {
  return {
    auth: {
      users: AuthFetchers.refreshUsers
    }
  };
};

export default Context
