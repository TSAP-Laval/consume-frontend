import Dispatcher from "../Dispatcher"
import {serverUrl} from "Config"
import axios, {AxiosResponse} from "axios"
import * as Actions from "./Actions"
import {ITeam, ITeamMetricStats} from "../../models/DatabaseModels";
import { CreateErrorAction } from "../Error/ErrorAction";

const token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhdXRoIiwidXNlciI6NSwiaWF0IjoxNDk1MjQ0MTQ4fQ.-xpppidIjMRqfGTMqo5fDYBOntGz7VmTaGFGSzUPe3g";
const instance = axios.create({
    headers: {"X-Auth-Token":token}
});

export function FetchTeam(team_id: number) {
    Dispatcher.dispatch(new Actions.FetchTeam());

    let url: string = serverUrl + "teams/" + team_id;

    instance.get(url).then((response: AxiosResponse) => {
        let data: ITeam = (response.data.data as ITeam);
        Dispatcher.dispatch(new Actions.ReceiveTeam(data))
    }).catch((error) => {
        CreateErrorAction(error);
    });
}

export function FetchTeamMetricStats(team_id: number) {
    const fetch_metrics = new Actions.FetchTeamMetricStats();
    Dispatcher.dispatch(fetch_metrics);

    let url: string = serverUrl + "stats/teams/" + team_id.toString();

    instance.get(url).then((response: AxiosResponse) => {
        let data: ITeamMetricStats = (response.data.data.team_matches as ITeamMetricStats);
        Dispatcher.dispatch(new Actions.ReceiveTeamMetricStats(team_id, data));
    }).catch((error => {
        CreateErrorAction(error);
    }));
}