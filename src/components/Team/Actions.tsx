import {IAction} from "../../models/ActionCreation"
import { ITeam, IUser } from "../../models/DatabaseModels"

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

export class FetchTeams implements IAction {
    type: string;

    constructor() {
        this.type = "FETCH_TEAMS";
    }
}

export class ReceiveTeams implements IAction {
    type: string;
    user: IUser;

    constructor(user: IUser) {
        this.type = "RECEIVE_TEAMS";
        this.user = user;
    }
}