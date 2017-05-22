import {IAction} from "../../../models/ActionCreation";
import Dispatcher from "../../Dispatcher";
import axios, {AxiosResponse} from "axios"
import {serverUrl} from "Config";
import {CreateErrorAction} from "../../Error/ErrorAction";
import {CreatePlayerReceivedAction} from "./PlayerReceived";
import {IPlayer} from "../../../models/DatabaseModels";


export class FetchPlayerAction implements IAction {
    type: string;

    constructor() {
        this.type = "FETCH_PLAYER";
    }
}

export function CreateFetchPlayerAction(teamID: number, playerID: number, token: string) {
    let instance = axios.create({
        headers: {"X-Auth-Token": token}
    });

    Dispatcher.dispatch(new FetchPlayerAction());

    let url: string = serverUrl + "players/" + playerID;

    instance.get(url).then(
        (resp: AxiosResponse) => {
            CreatePlayerReceivedAction(resp.data.data as IPlayer);
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}