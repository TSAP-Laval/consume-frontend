import { EventEmitter } from "events"
import Dispatcher from "../Dispatcher"
import {IAction} from "../../models/ActionCreation";
import {ITeam} from "../../models/DatabaseModels";
import * as Actions from "./Actions"
import { ITeamSummary } from "../../models/DatabaseModelsSummaries";

class TeamStore extends EventEmitter {
    fetching: boolean;
    team: ITeam;
    teams: Array<ITeamSummary>;

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

            case "FETCH_TEAMS":
                this.fetching = true;
                this.emit(action.type);
                break;

            case "RECEIVE_TEAM":
                this.team = (action as Actions.ReceiveTeam).team;
                this.fetching = false;
                this.emit(action.type);
                break;
                
            case "RECEIVE_TEAMS":
                this.teams = (action as Actions.ReceiveTeams).teams;
                this.fetching = false;
                this.emit(action.type);
                break;

        }
    }
}

const store = new TeamStore();
export default store;

Dispatcher.register(store.handleActions.bind(store));