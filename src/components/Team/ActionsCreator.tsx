import Dispatcher from "../Dispatcher"
import {serverUrl} from "Config"
import axios, {AxiosResponse} from "axios"
import * as Actions from "./Actions"
import { ITeam, IUser, ITeamMetricStats } from "../../models/DatabaseModels";
import { CreateErrorAction } from "../Error/ErrorAction";
import { ITeamSummary } from "../../models/DatabaseModelsSummaries";
import {ClearTeamStats} from "./Actions";


export function FetchTeam(team_id: number, token: string) {

    let instance = axios.create({
        headers: {"X-Auth-Token":token}
    });

    Dispatcher.dispatch(new Actions.FetchTeam());

    let url: string = serverUrl + "teams/" + team_id;

    instance.get(url).then((response: AxiosResponse) => {
        let data: ITeam = (response.data.data as ITeam);
        Dispatcher.dispatch(new Actions.ReceiveTeam(data))
    }).catch((error) => {
        CreateErrorAction(error);
    });
}

export function CreateGetTeamsAction(userId: number, token: string, isAdmin: boolean) {
    Dispatcher.dispatch(new Actions.FetchTeams());

    let url: string = isAdmin ? serverUrl + "teams": serverUrl + "users/" + userId;


    let instance = axios.create({
        headers: {"X-Auth-Token": token}
    });
    instance.get(url).then((response: AxiosResponse) => {
        let data: Array<ITeamSummary> = isAdmin ? (response.data.data.hits as Array<ITeamSummary>) :
            (response.data.data.teams as Array<ITeamSummary>);
        Dispatcher.dispatch(new Actions.ReceiveTeams(data));
    }).catch((error) => {
        CreateErrorAction(error);
    });
}

export function FetchTeamMetricStats(team_id: number, token: string) {
    let instance = axios.create({
        headers: {"X-Auth-Token": token}
    });

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

export function CreateClearTeamStatsAction(teamId: number) {
    Dispatcher.dispatch(new ClearTeamStats(teamId));
}