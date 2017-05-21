import axios, {AxiosResponse} from "axios"
import Dispatcher from "../Dispatcher"
import {CreateErrorAction} from "../Error/ErrorAction";
import {serverUrl} from "Config"
import * as Actions from "./Actions"
import {IActionSummary} from "../../models/DatabaseModelsSummaries"

const token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhdXRoIiwidXNlciI6NSwiaWF0IjoxNDk1MzI1NDc3fQ.68v_Y8ooJrJmUETEJlcddPJUdOg0TqjnJzfAwWWVAbc";
const instance = axios.create({
    headers: {"X-Auth-Token":token}
});

export function FetchMatchActions(team_id: number, match_id: number) {
    const fetch_match_actions = new Actions.FetchMatchActions;
    Dispatcher.dispatch(fetch_match_actions);

    let url = serverUrl + "teams/" + team_id + "/matches/" + match_id;

    instance.get(url).then((response: AxiosResponse) => {
        let data: IActionSummary[] = (response.data.data.actions as IActionSummary[]);
        const receive_match_actions = new Actions.ReceiveMatchActions(match_id, data);
        Dispatcher.dispatch(receive_match_actions);
    }).catch((error) => {
        CreateErrorAction(error);
    });
}