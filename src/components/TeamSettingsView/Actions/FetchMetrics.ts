import { IAction } from "../../../models/ActionCreation";
import axios, {AxiosResponse} from 'axios';
import Dispatcher from "../../Dispatcher";
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
    Dispatcher.dispatch(new FetchMetrics());

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
