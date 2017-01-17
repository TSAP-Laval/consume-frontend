import { EventEmitter } from "events";
import { IAction } from "../../interfaces"
import dispatcher from "../../dispatcher";
import { AddNumber } from "./actions/AddNumber" 

class ArrowMapStore extends EventEmitter {
    data: number[];

    constructor() {
        super();
        this.data = [];
    }

    getNumbers() {
        return this.data;
    }

    handleActions(action: IAction){
        switch(action.type) {
            case "ADD_NUMBER":
                this.data.push(Date.now())
                this.emit("change")
                break;
        }
    }
}

const store = new ArrowMapStore();
export default store;

dispatcher.register(store.handleActions.bind(store));