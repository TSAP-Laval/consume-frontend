import { EventEmitter } from "events"
import IAction from "../IAction"
import * as Actions from "./Actions"
import {Action} from "./Models"
import dispatcher from "../dispatcher"
import FilterStore from "./Filter/Store"

class MapStore extends EventEmitter {
    actions: Action[]
    fetching: boolean

    constructor() {
        super();
        this.actions = new Array<Action>()
        this.fetching = false
    }

    receiveActions(actions: Action[]){
        this.actions = actions
        FilterStore.setActionTypes(actions)
        FilterStore.setActionImpacts()
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "FETCH_ACTIONS":
                this.fetching = true
                this.emit("FETCH_ACTIONS")
                break;
            case "RECEIVE_ACTIONS":
                this.fetching = false
                this.receiveActions((action as Actions.ReceiveActions).actions)
                this.emit("RECEIVE_ACTIONS")
                break;
        }
    }
}

const store = new MapStore();
export default store;

dispatcher.register(store.handleActions.bind(store));