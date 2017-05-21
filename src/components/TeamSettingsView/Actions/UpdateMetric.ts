import { IAction } from "../../../models/ActionCreation";
import { CreateErrorAction } from "../../Error/ErrorAction";
import { CreateFetchMetricsAction } from './FetchMetrics';
import { Metric } from "../MetricModel";
import axios from 'axios';
import Dispatcher from "../../Dispatcher";
import * as Config from 'Config';

export class UpdateMetricAction implements IAction {
    type: string;

    metric: Metric;

    constructor(metric: Metric) {
        this.type = "UPDATE_METRIC";

        this.metric = metric;
    }
}

export function CreateUpdateMetricAction(metric: Metric, teamID: number, token: string) {
    Dispatcher.dispatch(new UpdateMetricAction(metric));

    let instance = axios.create({
        headers: {"X-Auth-Token": token}
    });

    let url: string = Config.serverUrl + "teams/" + teamID + "/metrics/" + metric.id.toString();

    instance.put(url, {
        name: metric.name,
        description: metric.description,
        formula: metric.formula
    })
    .then(
        () => {
            CreateFetchMetricsAction(teamID, token);
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}
