import { EventEmitter } from "events";
import { IAction } from "../../IAction"
import * as Actions from "./Actions"
import Action from "./models/Action"
import dispatcher from "../../dispatcher";

class ActionMapStore extends EventEmitter {
    actions: Action[]
    fetching: boolean

    constructor() {
        super();
        this.actions = new Array<Action>()
        this.fetching = false
    }

    setActions(actions: Action[]){
        this.actions = actions
    }
    
    getActions() {
        return this.actions;
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "FETCH_ACTIONS":
                this.fetching = true
                this.emit("FETCH_ACTIONS")
                break;
            case "RECEIVE_ACTIONS":
                this.setActions((action as Actions.ReceiveActions).getActions())
                this.fetching = false
                this.emit("RECEIVE_ACTIONS")
                break;
        }
    }
}

const store = new ActionMapStore();
export default store;

dispatcher.register(store.handleActions.bind(store));