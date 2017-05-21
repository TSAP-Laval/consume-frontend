import { IAction } from "../../../models/ActionCreation";
import { CreateErrorAction } from "../../Error/ErrorAction";
import { CreateFetchMetricsAction } from './FetchMetrics';
import { Metric } from "../MetricModel";
import axios from 'axios';
import Dispatcher from "../../Dispatcher";
import * as Config from 'Config';


export class CreateMetricAction implements IAction {
    type: string;
    metric: Metric;

    constructor(metric: Metric) {
        this.type = "CREATE_METRIC";
        this.metric = metric;
    }
}

export function CreateCreateMetricAction(metric: Metric, teamID: number, token: string) {
    Dispatcher.dispatch(new CreateMetricAction(metric));

    let instance = axios.create({
        headers: {"X-Auth-Token": token}
    });

    let url: string = Config.serverUrl + "teams/" + teamID + "/metrics";

    instance.post(url, metric)
    .then(
        () => {
            CreateFetchMetricsAction(teamID, token);
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}
