import { IAction } from "../../../models/ActionCreation";
import axios, {AxiosResponse} from 'axios';
import dispatcher from "../../Dispatcher";
import { CreateErrorAction } from "../../Error/ErrorAction";
import { CreateMetricsReceivedAction } from './MetricsReceived';
import { Metric } from '../MetricModel';
import * as Config from 'Config';

export class FetchMetrics implements IAction {
    type: string;

    constructor() {
        this.type = "FETCH_METRICS";
    }
}

export function CreateFetchMetricsAction(teamId: number) {
    dispatcher.dispatch(new FetchMetrics());

    // TODO: Enlever le hardcoding quand on se loggera pour vrai (et qu'on aura pas de data seedé)
    let url: string = Config.serverUrl + "/teams/" + teamId + "/metrics";

    axios.get(url).then(
        (resp: AxiosResponse) => {
            let metrics = resp.data as Array<Metric>;
            CreateMetricsReceivedAction(metrics);
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}
