import {IAction} from "../../Models/ActionCreation"
import {ITeam} from "../../Models/DatabaseModels"

export class FetchTeam implements IAction {
    type: string;

    constructor() {
        this.type = "FETCH_TEAM";
    }
}

export class ReceiveTeam implements IAction {
    type: string;
    team: ITeam;

    constructor(team: ITeam) {
        this.type = "RECEIVE_TEAM";
        this.team = team;
    }
}