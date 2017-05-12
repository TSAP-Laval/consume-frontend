import { EventEmitter } from "events"
import dispatcher from "../dispatcher"
import {IAction} from "../../Models/ActionCreation";
import {IMatch} from "../../Models/DatabaseModels";
import * as Actions from "../Actions"

class MatchStore extends EventEmitter {
    fetching: boolean;
    matches: IMatch[];

    constructor() {
        super();
        this.fetching = false;
        this.matches = new Array<IMatch>();
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "FETCH_MATCHES":
                this.fetching = true;
                this.emit("FETCH_MATCHES");
                break;
            case "RECEIVE_MATCHES":
                this.matches = (action as Actions.ReceiveMatches).matches;
                this.fetching = false;
                this.emit("RECEIVE_MATCHES");
                break;
        }
    }
}

const store = new MatchStore();
export default store;

dispatcher.register(store.handleActions.bind(store));