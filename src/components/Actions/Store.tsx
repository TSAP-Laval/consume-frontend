import { EventEmitter } from "events"
import dispatcher from "../dispatcher"
import {IActionSummary} from "../../Models/DatabaseModelsSummaries";
import {IAction} from "../../Models/ActionCreation";
import * as Actions from "./Actions"

class ActionStore extends EventEmitter {
    fetching: boolean;
    actions: IActionSummary[];

    constructor() {
        super();
        this.fetching = false;
        this.actions = new Array<IActionSummary>();
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "FETCH_MATCH_ACTIONS":
                this.fetching = true;
                this.emit("FETCH_ACTIONS");
                break;
            case "RECEIVE_MATCH_ACTIONS":
                this.fetching = false;
                this.actions = ((action as Actions.ReceiveMatchActions)).actions;
                this.emit("RECEIVE_ACTIONS");
                break;
        }
    }
}

const store = new ActionStore();
export default store;

dispatcher.register(store.handleActions.bind(store));