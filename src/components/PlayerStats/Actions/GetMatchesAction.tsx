import {IAction} from "../../../models/ActionCreation";
import Dispatcher from "../../Dispatcher"
import { CreateErrorAction } from "../../Error/ErrorAction";
import axios from 'axios';
import IMatch from "../Models/IMatch";
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

export function CreateGetMatchesAction(playerId: number, teamId: number, seasonID?: number, positionID?: number) {
    Dispatcher.dispatch(new GetMatchesAction(playerId, teamId));

    let url: string = Config.serverUrl + "/stats/player/" + playerId.toString() + "/team/" + teamId.toString();

    let params = [];

    if (seasonID) {
        params.push("season=" + seasonID.toString());
    }

    if (positionID) {
        params.push("position=" + positionID.toString());
    }

    if (params.length > 0) {
        url += '?' + params.join('&');
    }

    axios.get(url)
    .then((response) => {
        let matches : Array<IMatch> = response.data.matches as Array<IMatch>;

        let playerName : string = response.data.firstname;
        playerName = playerName.concat(" ", response.data.lastname);

        matches = matches.map((match) => {
            match.date = new Date(match.date.toString());
            return match;
        });
        Dispatcher.dispatch(new MatchesReceivedAction(matches.sort((a, b) => {
            return a.date.getTime() - b.date.getTime();
        }), playerName));
    },
    (err: Error) => {
        CreateErrorAction(err.toString());
    });
}
