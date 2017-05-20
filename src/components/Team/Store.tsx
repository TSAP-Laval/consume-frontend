import { EventEmitter } from "events"
import Dispatcher from "../Dispatcher"
import {IAction} from "../../models/ActionCreation";
import {ITeam} from "../../models/DatabaseModels";
import * as Actions from "./Actions"

class TeamStore extends EventEmitter {
    fetching: boolean;
    team: ITeam;

    constructor() {
        super();
        this.fetching = false;
    }

    handleActions(action: IAction) {
        console.log(action.type);

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

const store = new TeamStore;
Dispatcher.register(store.handleActions.bind(store));

export default store;