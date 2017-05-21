import { EventEmitter } from "events"
import Dispatcher from "../../Dispatcher"
import {IAction} from "../../../models/ActionCreation";
import {ITeam} from "../../../models/DatabaseModels";
import * as Actions from "../Actions"
import { ITeamSummary } from "../../../models/DatabaseModelsSummaries";

class TeamStore extends EventEmitter {
    fetching: boolean;
    teams: {[team_id: string] : ITeam};
    teamsList : Array<ITeamSummary>;
    

    constructor() {
        super();
        this.fetching = false;
        this.teams = {}
    }

    addTeam(team: ITeam) {
        this.teams[team.id.toString()] = team;
    }

    teamExists(team_id: number) {
        return (team_id.toString() in this.teams);
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "FETCH_TEAM":
                this.fetching = true;
                this.emit(action.type);
                break;
                
            case "RECEIVE_TEAM":
                this.addTeam((action as Actions.ReceiveTeam).team);
                this.fetching = false;
                this.emit(action.type);
                break;

            case "FETCH_TEAMS":
                this.fetching = true;
                this.emit(action.type);
                break;

            case "RECEIVE_TEAMS":
                this.teamsList = (action as Actions.ReceiveTeams).teams;
                this.fetching = false;
                this.emit(action.type);
                break;
        }
    }
}

const store = new TeamStore;
Dispatcher.register(store.handleActions.bind(store));

export default store;