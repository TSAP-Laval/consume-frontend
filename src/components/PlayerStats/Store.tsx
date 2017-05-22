import { EventEmitter } from "events";
import Dispatcher from "../Dispatcher";
import {IAction} from "../../models/ActionCreation";
import {IPlayer, IPlayerStats} from "../../models/DatabaseModels";
import {PlayerReceivedAction} from "./Actions/PlayerReceived";
import {PlayerStatsReceivedAction} from "./Actions/PlayerStatsReceived";


class StatsTableStore extends EventEmitter {

    player: IPlayer;
    playerStats: IPlayerStats[];

    playerFetching: boolean;
    statsFetching: boolean;

    constructor() {
        super();
        this.player = null;
        this.playerFetching = false;
        this.statsFetching = false;
    }

    isFetching(): boolean {
        return this.playerFetching || this.statsFetching;
    }

    handleActions(action: IAction){
        switch(action.type) {
            case "FETCH_PLAYER":
                this.playerFetching = true;
                this.emit("FetchingStateChanged");
                break;

            case "PLAYER_RECEIVED":
                let act = action as PlayerReceivedAction;
                this.playerFetching = false;
                this.player = act.player;

                this.emit("FetchingStateChanged");
                this.emit("PlayerChanged");
                break;

            case "FETCH_PLAYER_STATS":
                this.statsFetching = true;
                this.emit("FetchingStateChanged");
                break;

            case "PLAYER_STATS_RECEIVED":
                let pAct = action as PlayerStatsReceivedAction;
                this.statsFetching = false;
                this.playerStats = pAct.playerStats;

                this.emit("FetchingStateChanged");
                this.emit("PlayerStatsChanged");
                break;
        }
    }
}

const store = new StatsTableStore();
Dispatcher.register(store.handleActions.bind(store));
export default store;
