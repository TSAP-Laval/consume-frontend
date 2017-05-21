import { IAction } from "../../../models/ActionCreation";
import { CreateErrorAction } from "../../Error/ErrorAction";
import { CreateFetchMetricsAction } from './FetchMetrics';
import axios from 'axios';
import Dispatcher from "../../Dispatcher";
import * as Config from 'Config';


export class DeleteMetricAction implements IAction {
    type: string;

    constructor() {
        this.type = "DELETE_METRIC";
    }
}

export function CreateDeleteMetricAction(metricID: number, teamID: number, token: string) {
    Dispatcher.dispatch(new DeleteMetricAction());

    let instance = axios.create({
        headers: {"X-Auth-Token": token}
    });

    let url: string = Config.serverUrl + "teams/" + teamID + "/metrics/" + metricID.toString();

    if (!metricID) {
        return;
    }

    instance.delete(url)
    .then(
        () => {
            CreateFetchMetricsAction(teamID, token);
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}
