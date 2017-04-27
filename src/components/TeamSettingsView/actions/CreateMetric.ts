import { IAction } from "../../IAction";

import { CreateErrorAction } from "../../Error/ErrorAction";
import { CreateFetchMetricsAction } from './FetchMetrics';
import { Metric } from "../MetricModel";

import axios from 'axios';
import dispatcher from "../../dispatcher";

import * as Config from 'Config';


export class CreateMetricAction implements IAction {
    type: string;

    metric: Metric;

    constructor(metric: Metric) {
        this.type = "CREATE_METRIC";

        this.metric = metric;
    }
}

export function CreateCreateMetricAction(metric: Metric, teamID: number) {
    dispatcher.dispatch(new CreateMetricAction(metric));

    var url: string = Config.serverUrl + "/teams/" + teamID + "/metrics";

    axios.post(url, metric)
    .then(
        (resp) => {
            // Refresh the metrics once it's added (not the best way to get the IDs, but by far the simplest)
            CreateFetchMetricsAction(teamID);
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}
