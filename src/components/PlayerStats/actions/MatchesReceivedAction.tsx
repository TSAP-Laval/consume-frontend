import  IAction  from "../../IAction"
import dispatcher from "../../dispatcher"

import IMatch from "../models/IMatch";

import * as Config from 'Config';

export class MatchesReceivedAction implements IAction {
    type = "MATCHES_RECEIVED";

    matches: IMatch[];
    playerName: string;

    constructor(matches: IMatch[], playerName: string) {
        this.matches = matches;
        this.playerName = playerName;
    }
}

export function CreateMatchesReceivedAction(matches: IMatch[], playerName: string) {
    dispatcher.dispatch(new MatchesReceivedAction(matches, playerName));
}
