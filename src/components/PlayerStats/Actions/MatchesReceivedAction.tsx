import {IAction} from "../../../models/ActionCreation";
import dispatcher from "../../Dispatcher"
import IMatch from "../Models/IMatch";

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
