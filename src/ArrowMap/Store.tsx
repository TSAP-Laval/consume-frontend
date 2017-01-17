import { EventEmitter } from "events";
import { IAction } from "../interfaces"
import dispatcher from "../dispatcher"; 

class ArrowMapStore extends EventEmitter {
    data: String[];

    constructor() {
        super();
        this.data = ["A", "B", "C"];
    }

    getLetters() {
        return this.data;
    }

    addLetter(letter: String){
        this.data.push(letter);
    }

    handleActions(action: IAction){
        switch(action.type) {
            case "ADD_LETTER":
                this.data.push(action.type);
                this.emit("change");
        }
    }
}

const store = new ArrowMapStore();
export default store;

dispatcher.register(store.handleActions.bind(store));