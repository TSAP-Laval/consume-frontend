import {IAction} from "../../../models/ActionCreation";
import {ITeamMetricStats} from "../../../models/DatabaseModels"

export class FetchTeamMetricStats implements IAction {
    type: string;

    constructor() {
        this.type = "FETCH_TEAM_METRIC_STATS";
    }
}

export class ReceiveTeamMetricStats implements IAction {
    type: string;
    stats: ITeamMetricStats;

    constructor(stats: ITeamMetricStats) {
        this.type = "RECEIVE_TEAM_METRIC_STATS";
        this.stats = stats;
    }
}