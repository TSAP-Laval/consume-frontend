import {IAction} from "../../../Models/ActionCreation";
import {Player} from "../../../Models/DatabaseModels";
import dispatcher from "../../dispatcher";
import axios from 'axios';
import { CreateErrorAction } from "../../Error/ErrorAction";
import * as Config from 'Config';

export class GetPlayersActions implements IAction {
    type = "GET_PLAYERS";
    team_id: number;

    constructor(team_id: number) {
        this.team_id = team_id;
    }
}

export class PlayersReceivedAction implements IAction {
    type = "PLAYERS_RECEIVED";
    players: Player[];
    team_name: string;

    constructor(players: Player[], team_name: string) {
        this.players = players;
        this.team_name = team_name;
    }
}

export function CreateGetPlayersAction(team_id: number) {
    dispatcher.dispatch(new GetPlayersActions(team_id));

    let url: string = Config.serverUrl + "/stats/team/" + team_id.toString();

    axios.get(url)
    .then((response) => {
        //TODO: Définir une interface de retour pour les joueurs?
        let players: Array<Player> = response.data.players As Array<Player>;
        let team_name: string = response.data.name;

        CreatePlayersReceivedAction(players, team_name);
    }, 
    (err) => {
        CreateErrorAction(err.toString());
    });
}

export function CreatePlayersReceivedAction(players: Player[], team_name: string) {
    dispatcher.dispatch(new PlayersReceivedAction(players, team_name));
}