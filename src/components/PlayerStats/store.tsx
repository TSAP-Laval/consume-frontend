import { EventEmitter } from "events";
import  IAction  from "../IAction";
import dispatcher from "../dispatcher"; 

import IMatch from "./models/IMatch";
import Status from "./models/Status";
import { MatchesReceivedAction } from './actions/MatchesReceivedAction';

class StatsTableStore extends EventEmitter {
    data: Array<IMatch>;
    requestStatus: Status;
    playerName: string;

    constructor() {
        super();
        this.data = [];
        this.requestStatus = Status.Idle;
        this.playerName = "";
    }

    getMatches(): Array<IMatch> {
        return this.data;
    }

    getRequestStatus(): Status {
        return this.requestStatus;
    }

        getPlayerName(): string{
        return this.playerName;
    }


    handleActions(action: IAction){
        switch(action.type) {
            case "GET_MATCHES":
                // On affiche éventuellement un message de loading en attendant la
                // requête HTTP
                this.requestStatus = Status.Started;
                this.emit("requestState");
                break;

            case "MATCHES_RECEIVED":
                this.data = (action as MatchesReceivedAction).matches;
                this.playerName = (action as MatchesReceivedAction).playerName;
                this.emit("dataChange");

                this.requestStatus = Status.Idle
                this.emit("requestState");
                break;
        }
    }
}

const store = new StatsTableStore();
dispatcher.register(store.handleActions.bind(store));
export default store;
