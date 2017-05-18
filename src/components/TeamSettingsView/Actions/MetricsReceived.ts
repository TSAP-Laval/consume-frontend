import { IAction } from "../../../models/ActionCreation";
import dispatcher from "../../Dispatcher";
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
    dispatcher.dispatch(new MetricsReceived(metrics));
}
