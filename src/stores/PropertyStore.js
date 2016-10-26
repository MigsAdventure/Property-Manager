import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let _stats = [];

class PropertyStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register((action) => {
      const { type, payload } = action;
      switch(type) {
        case 'GET_STATS':
          _stats = payload;
          this.emit('CHANGE');
          break;
      }
    });
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getStats(){
    return _stats;
  }
}

export default new PropertyStore();
