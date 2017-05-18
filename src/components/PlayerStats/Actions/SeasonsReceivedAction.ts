import {IAction} from "../../../models/ActionCreation";
import dispatcher from "../../Dispatcher"
import { ISeason } from "../Models/ISeason";

export class SeasonsReceivedAction implements IAction {
    type = "SEASONS_RECEIVED";
    Seasons: ISeason[];

    constructor(seasons: ISeason[]) {
        this.Seasons = seasons;
    }
}

export function CreateSeasonsReceivedAction(seasons: ISeason[]) {
    dispatcher.dispatch(new SeasonsReceivedAction(seasons));
}
