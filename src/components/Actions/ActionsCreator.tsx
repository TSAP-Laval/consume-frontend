import axios, {AxiosRequestConfig, AxiosResponse} from "axios"
import dispatcher from "../Dispatcher"
import {CreateErrorAction} from "../Error/ErrorAction";
import {serverUrl} from "Config"
import * as Actions from "./Actions"
import {IActionSummary} from "../../models/DataBaseModelsSummaries"

let token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhdXRoIiwidXNlciI6eyJmaXJzdF9uYW1lIjoiS2V2aW4iLCJsYXN0X25hbWUiOiJLaW0iLCJpc19hZG1pbiI6dHJ1ZSwibW9kaWZpZWRfYXQiOiIyMDE3LTA1LTE2VDAyOjQwOjIyKzAwOjAwIiwiY3JlYXRlZF9hdCI6IjIwMTctMDUtMTZUMDI6NDA6MjIrMDA6MDAiLCJlbWFpbCI6InN0ZXBoZW5yb2RyaWd1ZXpAaG90bWFpbC5jb20iLCJpZCI6NSwidGVhbXMiOltdfSwiaWF0IjoxNDk0OTAzNjc2fQ.KcQAvgfdvrmpRJyfHe2s8RntxwflHdBGPMjQQbRdje4";

export function fetchMatchActions(team_id: number, match_id: number) {
    const fetch_match_actions = new Actions.FetchMatchActions();
    dispatcher.dispatch(fetch_match_actions);

    let url = serverUrl + "/teams/" + team_id + "/matches/" + match_id;
    let instance = axios.create({
        headers: {"X-Auth-Token":token}
    });

    instance.get(url).then((response: AxiosResponse) => {
        let data: IActionSummary[] = (response.data as IActionSummary[]);
        const receive_match_actions = new Actions.ReceiveMatchActions(data);
        dispatcher.dispatch(receive_match_actions);
    }).catch((error) => {
        CreateErrorAction(error);
    });
}