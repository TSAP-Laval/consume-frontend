import {IAction} from "../../models/ActionCreation"
import {ITeam} from "../../models/DatabaseModels"
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