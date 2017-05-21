import * as Actions from "../../Team/Actions";
import Dispatcher from "../../Dispatcher";
import axios, {AxiosResponse} from 'axios';
import { CreateErrorAction } from "../../Error/ErrorAction";
import * as Config from 'Config';
import { ITeamMetricStats } from "../../../models/DatabaseModels";


export function FetchTeamMetricStats(team_id: number, token: string) {
    Dispatcher.dispatch(new Actions.FetchTeamMetricStats());

    let url: string = Config.serverUrl + "/stats/team/" + team_id.toString();
    let instance = axios.create({
        headers: {"X-Auth-Token": token}
    });

    instance.get(url).then((response: AxiosResponse) => {
        let data: ITeamMetricStats = (response.data.data.team_matches as ITeamMetricStats);
        Dispatcher.dispatch(new Actions.ReceiveTeamMetricStats(team_id, data));
    }).catch((error => {
        CreateErrorAction(error);
    }));
}