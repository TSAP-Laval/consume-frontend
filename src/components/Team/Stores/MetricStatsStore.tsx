import {EventEmitter} from "events"
import Dispatcher from "../../Dispatcher";
import {IAction} from "../../../models/ActionCreation";
import {ITeamMetricStats} from "../../../models/DatabaseModels"
import * as Actions from "../Actions"

class TeamMetricStatsStore extends EventEmitter {
    fetching: boolean;
    metric_stats: {[team_id: string] : ITeamMetricStats};
    
     constructor() {
        super();
        this.fetching = false;
        this.metric_stats = {};
    }

    addTeamMetricStats(team_id: number, stats: ITeamMetricStats) {
         this.metric_stats[team_id.toString()] = stats;
    }

    teamMetricStatsExists(team_id: number) {
        return (team_id.toString() in this.metric_stats);
    }

    handleActions(action: IAction){
        switch(action.type) {
            case "FETCH_TEAM_METRIC_STATS":
                this.fetching = true;
                this.emit(action.type);
                break;

            case "RECEIVE_TEAM_METRIC_STATS":
                this.fetching = false;
                this.addTeamMetricStats((action as Actions.ReceiveTeamMetricStats).team_id, (action as Actions.ReceiveTeamMetricStats).stats);
                this.emit(action.type);
                break;

            case "CLEAR_TEAM_STATS":
                let act = action as Actions.ClearTeamStats;
                this.metric_stats = {};
                break;
        }
    }
}

const store = new TeamMetricStatsStore;
Dispatcher.register(store.handleActions.bind(store));

export default store;