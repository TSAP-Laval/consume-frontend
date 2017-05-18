import {IAction} from "../../models/ActionCreation";
import {IPlayer} from "../../models/DatabaseModels";

export class FetchPlayers implements IAction {
    type: string;

    constructor() {
        this.type = "FETCH_PLAYERS";
    }
}

export class OnPlayersReceived implements IAction {
    type: string;
    players: IPlayer[];
    team_name: string;

    constructor(players: IPlayer[], team_name: string) {
        this.type = "RECEIVE_PLAYERS";
        this.players = players;
        this.team_name = team_name;
    }
}