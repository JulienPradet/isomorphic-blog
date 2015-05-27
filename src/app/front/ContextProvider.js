import AuthConstants from './constants/AuthConstants'
import AuthActions from './actions/AuthActions'
import AuthDispatcher from './dispatchers/AuthDispatcher'
import AuthStore from './stores/AuthStore'

/*
 * The goal of this file is to init the context of the App in order to avoid
 * conflicts between two apps (especially on the server side)
 */

export const constants = {
  auth: AuthConstants()
};

export const dispatchers = {
  auth: AuthDispatcher(constants)
};

export const actions = {
  auth: AuthActions(dispatchers, constants)
};

export const stores = {
  auth: AuthStore(dispatchers, constants)
};
