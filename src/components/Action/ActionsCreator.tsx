import axios, {AxiosResponse} from "axios"
import Dispatcher from "../Dispatcher"
import {CreateErrorAction} from "../Error/ErrorAction";
import {serverUrl} from "Config"
import * as Actions from "./Actions"
import {IActionSummary} from "../../models/DatabaseModelsSummaries"
import LoginStore from "../Login/Store";
import {Size} from "../../models/ComponentModels";


export function FetchMatchActions(team_id: number, match_id: number, token: string) {
    const fetch_match_actions = new Actions.FetchMatchActions;
    Dispatcher.dispatch(fetch_match_actions);

    let instance = axios.create({
        headers: {"X-Auth-Token": token}
    });

    let url = serverUrl + "teams/" + team_id + "/matches/" + match_id;

    instance.get(url).then((response: AxiosResponse) => {
        let data: IActionSummary[] = (response.data.data.actions as IActionSummary[]);
        const receive_match_actions = new Actions.ReceiveMatchActions(match_id, data);
        Dispatcher.dispatch(receive_match_actions);
    },(error) => {
        CreateErrorAction(error);
    });
}