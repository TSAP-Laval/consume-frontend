import { IAction } from "../../IAction";

import { CreateErrorAction } from "../../Error/ErrorAction";
import { CreateFetchMetricsAction } from './FetchMetrics';
import { Metric } from "../MetricModel";

import axios from 'axios';
import dispatcher from "../../dispatcher";

import * as Config from 'Config';


export class UpdateMetricAction implements IAction {
    type: string;

    metric: Metric;

    constructor(metric: Metric) {
        this.type = "UPDATE_METRIC";

        this.metric = metric;
    }
}

export function CreateUpdateMetricAction(metric: Metric, teamID: number) {
    dispatcher.dispatch(new UpdateMetricAction(metric));

    var url: string = Config.serverUrl + "/teams/" + teamID + "/metrics/" + metric.id.toString();

    axios.put(url, {
        name: metric.name,
        description: metric.description,
        formula: metric.formula
    })
    .then(
        (resp) => {
            // Refresh the metrics once it's edited
            CreateFetchMetricsAction(teamID);
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}
