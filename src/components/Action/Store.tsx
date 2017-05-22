import { EventEmitter } from "events"
import Dispatcher from "../Dispatcher"
import {IActionSummary} from "../../models/DatabaseModelsSummaries";
import {IAction} from "../../models/ActionCreation";
import * as Actions from "./Actions"
import {Size} from "../../models/ComponentModels";

class ActionStore extends EventEmitter {
    fetching: boolean;
    actions: {[match_id: string] : IActionSummary[]};
    mapSize: Size;

    constructor() {
        super();
        this.fetching = false;
        this.actions = {};
        this.mapSize = new Size(3,4);
    }

    addActions(match_id: number, actions: IActionSummary[]) {
        this.actions[match_id.toString()] = actions;
    }

    getActionsForMatch(match_id: number) {
        return this.actions[match_id.toString()]? this.actions[match_id.toString()]: [];
    }

    getMapSize() {
        return this.mapSize;
    }


    setMapSize(size: Size){
        this.mapSize = size;
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
            case "RECEIVE_MAP_SIZE":
                this.setMapSize((action as Actions.ReceiveMapSize).map_size);
                this.emit(action.type);
                break;
        }
    }
}

const store = new ActionStore();
export default store;

Dispatcher.register(store.handleActions.bind(store));