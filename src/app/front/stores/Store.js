import EventEmitter from 'events'

export default class Store extends EventEmitter {
  constructor(dispatcher, constants, receiver, initData) {
    super();

    if(typeof initData !== "undefined") {
      for(var key in initData) {
        this['_'+key] = initData[key];
      }
    }

    dispatcher.register(receiver);

    this.constants = constants;
  }

  emitChange() {
    this.emit(this.constants.auth.CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(this.constants.auth.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(this.constants.auth.CHANGE_EVENT, callback);
  }
}
