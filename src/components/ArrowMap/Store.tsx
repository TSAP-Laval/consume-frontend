import { EventEmitter } from "events";
import { IAction } from "../../interfaces"
import dispatcher from "../../dispatcher";

class ArrowMapStore extends EventEmitter {
    constructor() {
        super();
    }

    handleActions(action: IAction){
        this.emit("change")
    }
}

const store = new ArrowMapStore();
export default store;

dispatcher.register(store.handleActions.bind(store));