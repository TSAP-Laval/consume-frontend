import { IAction } from "../../../models/ActionCreation";
import Dispatcher from "../../Dispatcher";
import { Metric } from '../MetricModel';

export class MetricsReceived implements IAction {
    type: string;
    metrics: Array<Metric>;

    constructor(metrics: Array<Metric>) {
        this.type = "METRICS_RECEIVED";
        this.metrics = metrics;
    }
}

export function CreateMetricsReceivedAction(metrics: Array<Metric>) {
    Dispatcher.dispatch(new MetricsReceived(metrics));
}
