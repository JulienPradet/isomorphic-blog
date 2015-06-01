import q from 'q'

export default class Dispatcher {
  constructor() {
    this._callbacks = [];
  }

  register(store, callback) {
    this._callbacks.push({store, callback});
    return this._callbacks.length - 1;
  }

  dispatch(payload) {
    this._callbacks.forEach(function(receiver, i) {
      receiver.callback.call(receiver.store, payload);
    });
  }
}
