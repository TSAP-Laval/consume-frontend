import {EventEmitter} from "events"
import dispatcher from "../../Dispatcher";
import {IAction} from "../../../models/ActionCreation";
import {ITeamMetricStats} from "../../../models/DatabaseModels"
import * as Actions from "./Actions"

class TeamMetricStatsStore extends EventEmitter {
    fetching: boolean;
    stats: ITeamMetricStats;
    
     constructor() {
        super();
        this.fetching = false;
    }

    handleActions(action: IAction){
        console.log(action.type);

        switch(action.type) {
            case "FETCH_TEAM_METRIC_STATS":
                this.fetching = true;
                this.emit(action.type);
                break;

            case "RECEIVE_TEAM_METRIC_STATS":
                this.fetching = false;
                this.stats = (action as Actions.ReceiveTeamMetricStats).stats;
                this.emit(action.type);
                break;
        }
    }
}

const store = new TeamMetricStatsStore();
export default store;

dispatcher.register(store.handleActions.bind(store));