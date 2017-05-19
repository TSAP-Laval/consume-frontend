import { EventEmitter } from "events";
import {IAction} from "../../models/ActionCreation";
import dispatcher from "../Dispatcher";
import IMatch from "./Models/IMatch";
import { ISeason } from "./Models/ISeason";
import { IPosition } from './Models/IPosition';
import Status from "./Models/Status";
import { MatchesReceivedAction } from './Actions/MatchesReceivedAction';
import { SeasonsReceivedAction } from './Actions/SeasonsReceivedAction';
import { PositionsReceivedAction } from './Actions/PositionsReceivedActions';
import { ChangeFilterAction } from './Actions/ChangeFilterAction';


class StatsTableStore extends EventEmitter {
    data: Array<IMatch>;
    seasons: Array<ISeason>;
    positions: Array<IPosition>;

    pName: string;

    matchesReceived: boolean;
    seasonsReceived: boolean;
    positionsReceived: boolean;

    selectedSeason: number;
    selectedPosition: number;

    constructor() {
        super();
        this.data = [];
        this.seasons = [];
        this.positions = [];
        this.pName = "";

        this.matchesReceived = false;
        this.seasonsReceived = false;
        this.positionsReceived = false;

        this.selectedSeason = null;
        this.selectedPosition = null;
    }

    getMatches(): Array<IMatch> {
        return this.data;
    }

    getSeasons(): Array<ISeason> {
        return this.seasons;
    }

    getPositions(): Array<IPosition> {
        // HACK parce qu'on a pas le temps de fix le bug de duplicates en backend
        // TODO: FIX
        let posValues = this.positions.map((p) => p.Nom);
        return this.positions.filter((v, i, a) => posValues.indexOf(v.Nom) === i);
    }

    getRequestStatus(): Status {
        return (this.matchesReceived && this.seasonsReceived && this.positionsReceived)? Status.Idle: Status.Started
    }

    getPlayerName(): string {
        return this.pName;
    }

    getSelectedSeason(): number {
        return this.selectedSeason;
    }

    getSelectedPosition(): number {
        return this.selectedPosition;
    }

    tryEmitFilter() {
        if (this.getRequestStatus() === Status.Idle) {
            this.emit("filter")
        }
    }


    handleActions(action: IAction){
        switch(action.type) {
            case "GET_MATCHES":
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
                this.selectedSeason = this.seasons[0].ID;

                this.emit("seasons");
                this.tryEmitFilter();
                break;

            case "POSITIONS_RECEIVED":
                this.positionsReceived = true;
                this.positions = (action as PositionsReceivedAction).Positions;
                this.selectedPosition = this.getPositions()[0].ID;

                this.emit('positions');
                this.tryEmitFilter();
                break;

            case "FILTER_SELECT":
                this.matchesReceived = false;
                this.emit('requestState');
                let act = action as ChangeFilterAction;
                this.selectedPosition = act.SelectedPosition;
                this.selectedSeason = act.SelectedSeason;
                this.emit('filter');
                break;
        }
    }
}

const store = new StatsTableStore();
dispatcher.register(store.handleActions.bind(store));
export default store;
