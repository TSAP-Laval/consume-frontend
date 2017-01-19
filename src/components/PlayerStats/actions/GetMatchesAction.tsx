import  IAction  from "../../IAction"
import dispatcher from "../../dispatcher"

import axios from 'axios';

import IMatch from "../models/IMatch";

import { MatchesReceivedAction } from "./MatchesReceivedAction";

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

    axios.get(url)
    .then((response) => {
        let matches : Array<IMatch> = response.data.matches as Array<IMatch>;
        dispatcher.dispatch(new MatchesReceivedAction(matches));
    }, 
    (err) => {
        console.log(err);
    });
}
