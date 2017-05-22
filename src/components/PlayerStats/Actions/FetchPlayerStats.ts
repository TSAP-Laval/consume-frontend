import {IAction} from "../../../models/ActionCreation";
import Dispatcher from "../../Dispatcher";
import axios, {AxiosResponse} from "axios"
import {serverUrl} from "Config";
import {CreateErrorAction} from "../../Error/ErrorAction";
import {IPlayerStats} from "../../../models/DatabaseModels";
import {CreatePlayerStatsReceivedAction} from "./PlayerStatsReceived";


export class FetchPlayerStatsAction implements IAction {
    type: string;

    constructor() {
        this.type = "FETCH_PLAYER_STATS";
    }
}

export function CreateFetchPlayerStatsAction(teamID: number, playerID: number, seasonID: number, token: string) {
    let instance = axios.create({
        headers: {"X-Auth-Token": token}
    });

    Dispatcher.dispatch(new FetchPlayerStatsAction());

    let url: string = serverUrl + "stats/teams/" + teamID + "/players/" + playerID + '?season_id=' + seasonID;

    instance.get(url).then(
        (resp: AxiosResponse) => {
            CreatePlayerStatsReceivedAction(resp.data.data as IPlayerStats[]);
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}