export class EventEmitter {
    constructor() {
        this._listener = new Map();
    }

    addEventListener(type, listener) {
        if (! this._listener.has(type)) {
            this._listener.set(type, new Set())
        }
        const listenerSet = this._listener.get(type);
        listenerSet.add(listener);
    }

    removeEventListener(type, listener) {
        const listenerSet = this._listener.get(type);
        if (! listenerSet) {
            return;
        }
        listenerSet.forEach(ownListener => {
            if (ownListener === listener) {
                listenerSet.delete(listener);
            }
        })
    }

    emit(type) {
        const listenerSet = this._listener.get(type);
        if (! listenerSet) {
            return;
        }
        listenerSet.forEach(listener => {
            listener.call(this);
        })
    }
}
