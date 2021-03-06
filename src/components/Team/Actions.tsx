import {IAction} from "../../models/ActionCreation"
import { ITeam, IUser } from "../../models/DatabaseModels"
import { ITeamSummary } from "../../models/DatabaseModelsSummaries";
import {ITeamMetricStats} from "../../models/DatabaseModels"

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
    teams: Array<ITeamSummary>;

    constructor(teams: Array<ITeamSummary>) {
        this.type = "RECEIVE_TEAMS";
        this.teams = teams;
    }
}


export class FetchTeamMetricStats implements IAction {
    type: string;

    constructor() {
        this.type = "FETCH_TEAM_METRIC_STATS";
    }
}

export class ReceiveTeamMetricStats implements IAction {
    type: string;
    team_id: number;
    stats: ITeamMetricStats;

    constructor(team_id: number, stats: ITeamMetricStats) {
        this.type = "RECEIVE_TEAM_METRIC_STATS";
        this.team_id = team_id;
        this.stats = stats;
    }
}

export class ClearTeamStats implements IAction {
    type: string;
    team_id: number;

    constructor(team_id: number) {
        this.type = 'CLEAR_TEAM_STATS';
        this.team_id = team_id;
    }
}