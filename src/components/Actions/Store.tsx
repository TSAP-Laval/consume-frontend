import { EventEmitter } from "events"
import dispatcher from "../dispatcher"
import {Action} from "../../Models/DatabaseModels";
import {IAction} from "../../Models/ActionCreation";

class ActionStore extends EventEmitter {
    fetching: boolean;
    actions: Action[];

    constructor() {
        super();
        this.fetching = false;
        this.actions = new Array<Action>();
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "FETCH_ACTIONS":
                this.fetching = true;
                this.emit("FETCH_ACTIONS");
                break;
            case "RECEIVE_ACTIONS":
                this.fetching = false;
                this.actions = ((action as Actions.ReceiveActions).actions;
                this.emit("RECEIVE_ACTIONS");
                break;
        }
    }
}

const store = new ActionStore();
export default store;

dispatcher.register(store.handleActions.bind(store));