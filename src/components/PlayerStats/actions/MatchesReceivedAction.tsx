import  IAction  from "../../IAction"
import dispatcher from "../../dispatcher"

import IMatch from "../models/IMatch";

import * as Config from 'Config';

export class MatchesReceivedAction implements IAction {
    type = "MATCHES_RECEIVED";

    matches: IMatch[];

    constructor(matches: IMatch[]) {
        this.matches = matches;
    }
}

export function CreateMatchesReceivedAction(matches: IMatch[]) {
    dispatcher.dispatch(new MatchesReceivedAction(matches));
}
