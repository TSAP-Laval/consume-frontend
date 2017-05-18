import {IAction} from "../../models/ActionCreation"
import {ITeam} from "../../models/DatabaseModels"

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