import {IAction} from "../../../models/ActionCreation";
import Dispatcher from "../../Dispatcher";
import axios, {AxiosResponse} from "axios"
import {serverUrl} from "Config";
import {CreateErrorAction} from "../../Error/ErrorAction";
import {CreateSeasonsReceivedAction} from "./SeasonsReceived";
import {ISeason} from "../../../models/DatabaseModels";
import {CreateFetchPlayerAction} from "./FetchPlayer";
import {CreateFetchPlayerStatsAction} from "./FetchPlayerStats";


export class FetchSeasonsAction implements IAction {
    type: string;

    constructor() {
        this.type = "FETCH_SEASONS";
    }
}

export function CreateFetchSeasonsAction(teamID: number, playerID: number, token: string) {
    let instance = axios.create({
        headers: {"X-Auth-Token": token}
    });

    Dispatcher.dispatch(new FetchSeasonsAction());

    let url: string = serverUrl + "seasons";

    instance.get(url).then(
        (resp: AxiosResponse) => {
            let seasons = resp.data.data.hits as ISeason[];
            CreateSeasonsReceivedAction(seasons);
            CreateFetchPlayerAction(teamID, playerID, token);
            CreateFetchPlayerStatsAction(teamID, playerID, seasons[seasons.length - 1].id, token);
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}