import { IAction } from "../../IAction"

import axios from 'axios';
import dispatcher from "../../dispatcher";

import { CreateErrorAction } from "../../Error/ErrorAction";

import { Metric } from '../MetricModel';

import * as Config from 'Config';

export class MetricsReceived implements IAction {
    type: String;
    metrics: Array<Metric>;

    constructor(metrics: Array<Metric>) {
        this.type = "METRICS_RECEIVED";
        this.metrics = metrics;
    }
}

export function CreateMetricsReceivedAction(metrics: Array<Metric>) {
    dispatcher.dispatch(new MetricsReceived(metrics));
}
