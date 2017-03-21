import { IAction } from "../../IAction";

import { CreateErrorAction } from "../../Error/ErrorAction";
import { CreateFetchMetricsAction } from './FetchMetrics';
import { Metric } from "../MetricModel";

import axios from 'axios';
import dispatcher from "../../dispatcher";

import * as Config from 'Config';


export class DeleteMetricAction implements IAction {
    type: string;

    constructor() {
        this.type = "DELETE_METRIC";
    }
}

export function CreateDeleteMetricAction(metricID: number, teamID: number) {
    dispatcher.dispatch(new DeleteMetricAction());

    // TODO: Remove hardcoded team number when we have login
    var url: string = Config.serverUrl + "/teams/" + '0' + "/metrics/" + metricID.toString();

    if (!metricID) {
        // Don't do anything if metric is bad
        return;
    }

    axios.delete(url)
    .then(
        (resp) => {
            // Refresh the metrics once it's deleted.
            CreateFetchMetricsAction(teamID);
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}