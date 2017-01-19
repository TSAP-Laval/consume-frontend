import  IAction  from "../../IAction";
import dispatcher from "../../dispatcher";
import axios from 'axios';
import IJoueur from "../models/IJoueur";

import * as Config from 'Config';

// Action pour recevoir les joueurs­.
export class GetPlayersActions implements IAction {
    type = "GET_PLAYERS";
    TeamID: number;

    constructor(teamId: number) {
        this.TeamID = teamId;
    }
}

// Action qui spécifie que les joueurs ont été reçu.
export class PlayersReceivedAction implements IAction {
    type = "PLAYERS_RECEIVED";

    joueurs: IJoueur[];

    constructor(joueurs: IJoueur[]) {
        this.joueurs = joueurs;
    }
}

export function CreateGetPlayersAction(playerId: number, teamId: number) {
    dispatcher.dispatch(new GetPlayersActions(teamId));

    // On définit l'URL à partir duquel axios va effectuer son call asyncrhone.
    var url: string = Config.serverUrl + "/stats/team/"+ teamId.toString();

    axios.get(url)
    .then((response) => {
        let joueurs : Array<IJoueur> = response.data.matches as Array<IJoueur>;

        joueurs = joueurs.map((joueur) => {
            return joueur;
        });
        dispatcher.dispatch(new PlayersReceivedAction(joueurs));
    }, 
    (err) => {
        console.log(err);
    });
}

export function CreatePlayersReceivedAction(joueurs: IJoueur[]) {
    dispatcher.dispatch(new PlayersReceivedAction(joueurs));
}