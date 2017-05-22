import {IAction} from "../../../models/ActionCreation";
import Dispatcher from "../../Dispatcher";
import {ISeason} from "../../../models/DatabaseModels";


export class SeasonsReceivedAction implements IAction {
    type: string;
    seasons: ISeason[];

    constructor(seasons: ISeason[]) {
        this.type = "SEASONS_RECEIVED";
        this.seasons = seasons;
    }
}

export function CreateSeasonsReceivedAction(seasons: ISeason[]) {
    Dispatcher.dispatch(new SeasonsReceivedAction(seasons));
}
