import { EventEmitter } from "events";
import  IAction  from "../IAction";
import dispatcher from "../dispatcher";

import IMatch from "./models/IMatch";
import { ISeason } from "./models/ISeason";
import { IPosition } from './models/IPosition';
import Status from "./models/Status";
import { MatchesReceivedAction } from './actions/MatchesReceivedAction';
import { SeasonsReceivedAction } from './actions/SeasonsReceivedAction';
import { PositionsReceivedAction } from './actions/PositionsReceivedActions';

class StatsTableStore extends EventEmitter {
    data: Array<IMatch>;
    seasons: Array<ISeason>;
    positions: Array<IPosition>;

    pName: string;

    matchesReceived: boolean;
    seasonsReceived: boolean;
    positionsReceived: boolean;

    constructor() {
        super();
        this.data = [];
        this.seasons = [];
        this.positions = [];
        this.pName = "";

        this.matchesReceived = false;
        this.seasonsReceived = false;
        this.positionsReceived = false;
    }

    getMatches(): Array<IMatch> {
        return this.data;
    }

    getSeasons(): Array<ISeason> {
        return this.seasons;
    }

    getPositions(): Array<IPosition> {
        return this.positions;
    }

    getRequestStatus(): Status {
        return (this.matchesReceived && this.seasonsReceived && this.positionsReceived)? Status.Idle: Status.Started
    }

    getPlayerName(): string {
        return this.pName;
    }


    handleActions(action: IAction){
        switch(action.type) {
            case "GET_MATCHES":
                // On affiche éventuellement un message de loading en attendant la
                // requête HTTP
                this.emit("requestState");
                break;

            case "MATCHES_RECEIVED":
                this.matchesReceived = true;
                this.emit("requestState");

                this.data = (action as MatchesReceivedAction).matches;
                this.pName = (action as MatchesReceivedAction).playerName;
                this.emit("dataChange");
                break;

            case "SEASONS_RECEIVED":
                this.seasonsReceived = true;
                this.seasons = (action as SeasonsReceivedAction).Seasons;
                this.emit("seasons");
                break;

            case "POSITIONS_RECEIVED":
                this.positionsReceived = true;
                this.positions = (action as PositionsReceivedAction).Positions;
                this.emit('positions');
                break;
        }
    }
}

const store = new StatsTableStore();
dispatcher.register(store.handleActions.bind(store));
export default store;
