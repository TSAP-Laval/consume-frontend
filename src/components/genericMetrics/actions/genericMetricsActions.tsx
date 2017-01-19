import  IAction  from "../../IAction";
import dispatcher from "../../dispatcher";
import axios from 'axios';
import IJoueur from "../models/IJoueur";

import { CreateErrorAction } from "../../Error/ErrorAction";

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
    nomEquipe: string;

    constructor(joueurs: IJoueur[], nomEquipe: string) {
        this.joueurs = joueurs;
        this.nomEquipe = nomEquipe;
    }
}

export function CreateGetPlayersAction(teamId: number) {
    dispatcher.dispatch(new GetPlayersActions(teamId));

    // On définit l'URL à partir duquel axios va effectuer son call asyncrhone.
    var url: string = Config.serverUrl + "/stats/team/" + teamId.toString();

    axios.get(url)
    .then((response) => {
        //On récupère les joueurs contenu dans la réponse en JSON.
        let joueurs : Array<IJoueur> = response.data.players as Array<IJoueur>;
        let nomEquipe: string = response.data.name;

        //Nous allons passer la liste de joueurs au dispatcher afin que celui
        //le dispatche. Le store correspondant répondra.
        CreatePlayersReceivedAction(joueurs, nomEquipe);
    }, 
    (err) => {
        CreateErrorAction(err.toString());
    });
}

export function CreatePlayersReceivedAction(joueurs: IJoueur[], nomEquipe: string) {
    dispatcher.dispatch(new PlayersReceivedAction(joueurs, nomEquipe));
}