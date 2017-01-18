import { EventEmitter } from "events";
import { IAction } from "../interfaces";
import dispatcher from "../dispatcher"; 

class StatsTableStore extends EventEmitter {
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
            case "START_GET":
                // On affiche éventuellement un message de loading en attendant la
                // requête HTTP
                this.emit("change");
        }
    }
}

const store = new StatsTableStore();
export default store;

dispatcher.register(store.handleActions.bind(store));