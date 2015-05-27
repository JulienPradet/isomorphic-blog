import q from 'q'

export default class Dispatcher {
  constructor() {
    this._callbacks = [];
  }

  register(callback) {
    this._callbacks.push(callback);
    return this._callbacks.length - 1;
  }

  dispatch(payload) {
    this._callbacks.forEach(function(callback, i) {
      callback(payload);
    });
  }
}
