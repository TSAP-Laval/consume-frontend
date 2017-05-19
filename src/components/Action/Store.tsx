import { EventEmitter } from "events"
import Dispatcher from "../Dispatcher"
import {IActionSummary} from "../../models/DatabaseModelsSummaries";
import {IAction} from "../../models/ActionCreation";
import * as Actions from "./Actions"

class ActionStore extends EventEmitter {
    fetching: boolean;
    actions: IActionSummary[];

    constructor() {
        super();
        this.fetching = false;
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "FETCH_MATCH_ACTIONS":
                this.fetching = true;
                this.emit(action.type);
                break;
            case "RECEIVE_MATCH_ACTIONS":
                this.fetching = false;
                this.actions = ((action as Actions.ReceiveMatchActions)).actions;
                this.emit(action.type);
                break;
        }
    }
}

const store = new ActionStore();
export default store;

Dispatcher.register(store.handleActions.bind(store));