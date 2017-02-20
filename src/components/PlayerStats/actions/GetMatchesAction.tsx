import  IAction  from "../../IAction"
import dispatcher from "../../dispatcher"

import { CreateErrorAction } from "../../Error/ErrorAction";

import axios from 'axios';

import IMatch from "../models/IMatch";

import { MatchesReceivedAction } from "./MatchesReceivedAction";

import { CreateGetSeasonsAction } from "./GetSeasonsAction";
import { CreateGetPositionsAction } from "./GetPositionsAction";

import * as Config from 'Config';

export class GetMatchesAction implements IAction {
    type = "GET_MATCHES";

    PlayerID: number;
    TeamID: number;

    constructor(playerId: number, teamId: number) {
        this.PlayerID = playerId;
        this.TeamID = teamId;
    }
}

export function CreateGetMatchesAction(playerId: number, teamId: number) {
    dispatcher.dispatch(new GetMatchesAction(playerId, teamId));

    var url: string = Config.serverUrl + "/stats/player/" + playerId.toString() + "/team/" + teamId.toString();

    CreateGetSeasonsAction();
    CreateGetPositionsAction(playerId);

    axios.get(url)
    .then((response) => {
        let matches : Array<IMatch> = response.data.matches as Array<IMatch>;
        //On récupère le prénom du joueur pour l'affichage.
        let playerName : string = response.data.firstname;
        // On y ajoute son nom.
        playerName = playerName.concat(" ", response.data.lastname);

        // TEMPORAIRE: Parse date, serait mieux de faire dans un objet?
        matches = matches.map((match) => {
            match.date = new Date(match.date.toString())
            return match;
        });
        dispatcher.dispatch(new MatchesReceivedAction(matches.sort((a, b) => {
            return a.date.getTime() - b.date.getTime();
        }), playerName));
    },
    (err: Error) => {
        CreateErrorAction(err.toString());
    });
}
