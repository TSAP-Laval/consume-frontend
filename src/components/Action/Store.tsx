import { EventEmitter } from "events"
import Dispatcher from "../Dispatcher"
import {IActionSummary} from "../../models/DatabaseModelsSummaries";
import {IAction} from "../../models/ActionCreation";
import * as Actions from "./Actions"

class ActionStore extends EventEmitter {
    fetching: boolean;
    actions: {[match_id: string] : IActionSummary[]};

    constructor() {
        super();
        this.fetching = false;
        this.actions = {};
    }

    addActions(match_id: number, actions: IActionSummary[]) {
        this.actions[match_id.toString()] = actions;
    }

    getActionsForMatch(match_id: number) {
        return this.actions[match_id.toString()]? this.actions[match_id.toString()]: [];
    }

    actionsExists(match_id: number) {
        return(match_id.toString() in this.actions);
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "FETCH_MATCH_ACTIONS":
                this.fetching = true;
                this.emit(action.type);
                break;
            case "RECEIVE_MATCH_ACTIONS":
                this.fetching = false;
                this.addActions((action as Actions.ReceiveMatchActions).match_id, (action as Actions.ReceiveMatchActions).actions);
                this.emit(action.type);
                break;
        }
    }
}

const store = new ActionStore();
export default store;

Dispatcher.register(store.handleActions.bind(store));