import { EventEmitter } from "events"
import dispatcher from "../dispatcher"
import {IAction} from "../../Models/ActionCreation";
import {ITeam} from "../../Models/DatabaseModels";
import * as Actions from "./Actions"

class TeamStore extends EventEmitter {
    fetching: boolean;
    team: ITeam;

    constructor() {
        super();
        this.fetching = false;
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "FETCH_TEAM":
                this.fetching = true;
                this.emit(action.type);
                break;
            case "RECEIVE_TEAM":
                this.team = (action as Actions.ReceiveTeam).team;
                this.fetching = false;
                this.emit(action.type);
                break;
        }
    }
}

const store = new TeamStore();
export default store;

dispatcher.register(store.handleActions.bind(store));