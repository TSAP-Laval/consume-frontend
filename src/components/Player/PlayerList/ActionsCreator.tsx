import * as Actions from "./Actions"
import Dispatcher from "../../Dispatcher";
import axios, {AxiosResponse} from 'axios';
import { CreateErrorAction } from "../../Error/ErrorAction";
import * as Config from 'Config';
import { ITeamMetricStats } from "../../../models/DatabaseModels"

const token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhdXRoIiwidXNlciI6NSwiaWF0IjoxNDk1MjQ0MTQ4fQ.-xpppidIjMRqfGTMqo5fDYBOntGz7VmTaGFGSzUPe3g";

export function FetchTeamMetricStats(team_id: number) {
    console.log("BEFORE DISPATCHING");

    const fetch_metrics = new Actions.FetchTeamMetricStats;
    Dispatcher.dispatch(fetch_metrics);

    console.log("AFTER DISPATCHING");

    let url: string = Config.serverUrl + "/stats/team/" + team_id.toString();
    let instance = axios.create({
        headers: {"X-Auth-Token": token}
    });

    instance.get(url).then((response: AxiosResponse) => {
        let data: ITeamMetricStats = (response.data.data.team_matches as ITeamMetricStats);
        Dispatcher.dispatch(new Actions.ReceiveTeamMetricStats(data));
    }).catch((error => {
        CreateErrorAction(error);
    }));
}