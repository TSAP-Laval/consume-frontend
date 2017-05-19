import * as Actions from "./Actions"
import dispatcher from "../../Dispatcher";
import axios, {AxiosResponse} from 'axios';
import { CreateErrorAction } from "../../Error/ErrorAction";
import * as Config from 'Config';
import {ITeamMetricStats} from "../../../models/DatabaseModels";

const token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhdXRoIiwidXNlciI6eyJmaXJzdF9uYW1lIjoiS2V2aW4iLCJsYXN0X25hbWUiOiJLaW0iLCJpc19hZG1pbiI6dHJ1ZSwibW9kaWZpZWRfYXQiOiIyMDE3LTA1LTE2VDAyOjQwOjIyKzAwOjAwIiwiY3JlYXRlZF9hdCI6IjIwMTctMDUtMTZUMDI6NDA6MjIrMDA6MDAiLCJlbWFpbCI6InN0ZXBoZW5yb2RyaWd1ZXpAaG90bWFpbC5jb20iLCJpZCI6NSwidGVhbXMiOltdfSwiaWF0IjoxNDk0OTAzNjc2fQ.KcQAvgfdvrmpRJyfHe2s8RntxwflHdBGPMjQQbRdje4";

export function FetchTeamMetricStats(team_id: number) {
    dispatcher.dispatch(new Actions.FetchTeamMetricStats());

    let url: string = Config.serverUrl + "/stats/team/" + team_id.toString();
    let instance = axios.create({
        headers: {"X-Auth-Token": token}
    });

    instance.get(url)
        .then((response: AxiosResponse) => {
                let data: ITeamMetricStats = (response.data as ITeamMetricStats);
                dispatcher.dispatch(new Actions.ReceiveTeamMetricStats(data));
            },
            (err) => {
                CreateErrorAction(err.toString());
            });
}