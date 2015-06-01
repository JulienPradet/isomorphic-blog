import EventEmitter from 'events'

export default class Store extends EventEmitter {
  constructor(dispatcher, constants, callback) {
    super();

    dispatcher.register(this, callback);

    this.constants = constants;
  }

  setInitData(initData) {
    if(typeof initData !== "undefined") {
      for(var key in initData) {
        this['_'+key] = initData[key];
      }
    }
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
