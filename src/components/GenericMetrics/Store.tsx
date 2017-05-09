import {EventEmitter} from "events"
import dispatcher from "../dispatcher";
import {IAction} from "../../Models/ActionCreation";
import {Player} from "../../Models/DatabaseModels";

class GenericMetricsStore extends EventEmitter{
    players: Array<Player>;
    fetching: boolean;
    team_name: string;
    
     constructor() {
        super();
        this.players = new Array<Player>();
        this.fetching = false;
        this.team_name = "";
    }

    handleActions(action: IAction){
        switch(action.type) {
            case "FETCH_PLAYERS":
                this.fetching = true
                this.emit("FETCH_PLAYERS");
                break;

            case "RECEIVE_PLAYERS":
                let received_action: PlayersReceivedAction = action as PlayersReceivedAction;

                this.fetching = false;
                this.players = received_action.players;
                this.team_name = received_action.team_name;
                this.emit("RECEIVE_PLAYERS");
                break;
        }
    }
    
}

const store = new GenericMetricsStore();
dispatcher.register(store.handleActions.bind(store));

export default store;