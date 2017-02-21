import  IAction  from "../../IAction"
import dispatcher from "../../dispatcher"

import { ISeason } from "../models/ISeason";

import * as Config from 'Config';

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
