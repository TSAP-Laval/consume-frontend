import {EventEmitter} from "events"
import dispatcher from "../../Dispatcher";
import {IAction} from "../../../models/ActionCreation";
import {ITeamMetricStats} from "../../../models/DatabaseModels"

class TeamMetricStatsStore extends EventEmitter{
    fetching: boolean;
    stats: ITeamMetricStats;
    
     constructor() {
        super();
        this.fetching = false;
    }

    handleActions(action: IAction){
        switch(action.type) {
            case "FETCH_TEAM_METRIC_STATS":
                this.fetching = true;
                this.emit(action.type);
                break;

            case "RECEIVE_TEAM_METRIC_STATS":
                this.fetching = false;
                this.emit(action.type);
                break;
        }
    }
    
}

const store = new TeamMetricStatsStore();
dispatcher.register(store.handleActions.bind(store));

export default store;