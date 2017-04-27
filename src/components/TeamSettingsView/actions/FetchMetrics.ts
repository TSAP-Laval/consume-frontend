import { IAction } from "../../IAction"

import axios from 'axios';
import dispatcher from "../../dispatcher";

import { CreateErrorAction } from "../../Error/ErrorAction";
import { CreateMetricsReceivedAction } from './MetricsReceived';

import { Metric } from '../MetricModel';

import * as Config from 'Config';

export class FetchMetrics implements IAction {
    type: String;

    constructor() {
        this.type = "FETCH_METRICS";
    }
}

export function CreateFetchMetricsAction(teamId: number) {
    dispatcher.dispatch(new FetchMetrics());

    // TODO: Enlever le hardcoding quand on se loggera pour vrai (et qu'on aura pas de data seedé)
    var url: string = Config.serverUrl + "/teams/" + teamId + "/metrics";

    axios.get(url).then(
        (resp) => {
            let metrics = resp.data as Array<Metric>;
            CreateMetricsReceivedAction(metrics);
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}
