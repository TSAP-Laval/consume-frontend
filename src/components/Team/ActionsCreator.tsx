import Dispatcher from "../Dispatcher"
import {serverUrl} from "Config"
import axios, {AxiosResponse} from "axios"
import * as Actions from "./Actions"
import {ITeam} from "../../models/DatabaseModels";
import { CreateErrorAction } from "../Error/ErrorAction";

const token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhdXRoIiwidXNlciI6eyJmaXJzdF9uYW1lIjoiS2V2aW4iLCJsYXN0X25hbWUiOiJLaW0iLCJpc19hZG1pbiI6dHJ1ZSwibW9kaWZpZWRfYXQiOiIyMDE3LTA1LTE2VDAyOjQwOjIyKzAwOjAwIiwiY3JlYXRlZF9hdCI6IjIwMTctMDUtMTZUMDI6NDA6MjIrMDA6MDAiLCJlbWFpbCI6InN0ZXBoZW5yb2RyaWd1ZXpAaG90bWFpbC5jb20iLCJpZCI6NSwidGVhbXMiOltdfSwiaWF0IjoxNDk0OTAzNjc2fQ.KcQAvgfdvrmpRJyfHe2s8RntxwflHdBGPMjQQbRdje4";

export function getTeam(team_id: number) {
    Dispatcher.dispatch(new Actions.FetchTeam());

    let url: string = serverUrl + "teams/" + team_id;
    let instance = axios.create({
        headers: {"X-Auth-Token":token}
    });

    instance.get(url).then((response: AxiosResponse) => {
        let data: ITeam = (response.data.data as ITeam);
        Dispatcher.dispatch(new Actions.ReceiveTeam(data))
    }).catch((error) => {
        CreateErrorAction(error);
    });
}