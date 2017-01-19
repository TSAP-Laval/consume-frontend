import {EventEmitter} from "events"
import  IAction  from "../IAction";
import dispatcher from "../dispatcher";
import IJoueur from "./models/IJoueur";
import { PlayersReceivedAction } from './actions/genericMetricsActions';

// Represent all generic metrics data management.
class GenericMetricsStore extends EventEmitter{

    data: Array<IJoueur>;
    
     constructor() {
        super();
        this.data = [];
    }

    // 
    getAllPlayers(): Array<IJoueur>{
        return this.data;
    }

        handleActions(action: IAction){
        switch(action.type) {
            case "GET_PLAYERS":
                this.emit("requestState");
                break;

            case "PLAYERS_RECEIVED":
                this.data = (action as PlayersReceivedAction).joueurs;
                this.emit("dataChange");
                break;
        }
    }
    
}

const genericMetricsStore = new GenericMetricsStore;

dispatcher.register(genericMetricsStore.handleActions.bind(GenericMetricsStore));
// Export the new created store.
export default genericMetricsStore;