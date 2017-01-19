import { EventEmitter } from "events";
import { IAction } from "../IAction"
import * as Actions from "./Actions"
import Arrow from "./models/Arrow"
import dispatcher from "../dispatcher";

class ArrowMapStore extends EventEmitter {
    arrows: Arrow[]
    fetching: boolean

    constructor() {
        super();
        this.arrows = new Array<Arrow>()
        this.fetching = false
    }

    setArrows(arrows: Arrow[]){
        this.arrows = arrows
    }
    
    getArrows() {
        return this.arrows;
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "FETCH_ARROWS":
                this.fetching = true
                this.emit("FETCH_ARROWS")
                break;
            case "RECEIVE_ARROWS":
                this.setArrows((action as Actions.ReceiveArrows).getArrows())
                this.fetching = false
                this.emit("RECEIVE_ARROWS")
                break;
        }
    }
}

const store = new ArrowMapStore();
export default store;

dispatcher.register(store.handleActions.bind(store));