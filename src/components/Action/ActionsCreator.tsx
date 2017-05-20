import axios, {AxiosRequestConfig, AxiosResponse} from "axios"
import Dispatcher from "../Dispatcher"
import {CreateErrorAction} from "../Error/ErrorAction";
import {serverUrl} from "Config"
import * as Actions from "./Actions"
import {IActionSummary} from "../../models/DataBaseModelsSummaries"

const token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhdXRoIiwidXNlciI6NSwiaWF0IjoxNDk1MjQ0MTQ4fQ.-xpppidIjMRqfGTMqo5fDYBOntGz7VmTaGFGSzUPe3g";

export function fetchMatchActions(team_id: number, match_id: number) {
    const fetch_match_actions = new Actions.FetchMatchActions;
    Dispatcher.dispatch(fetch_match_actions);

    let url = serverUrl + "/teams/" + team_id + "/matches/" + match_id;
    let instance = axios.create({
        headers: {"X-Auth-Token":token}
    });

    instance.get(url).then((response: AxiosResponse) => {
        let data: IActionSummary[] = (response.data as IActionSummary[]);
        const receive_match_actions = new Actions.ReceiveMatchActions(data);
        Dispatcher.dispatch(receive_match_actions);
    }).catch((error) => {
        CreateErrorAction(error);
    });
}