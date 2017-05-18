import { IAction } from "../../../models/ActionCreation";
import { CreateErrorAction } from "../../Error/ErrorAction";
import { CreateFetchMetricsAction } from './FetchMetrics';
import { Metric } from "../MetricModel";
import axios, {AxiosResponse} from 'axios';
import dispatcher from "../../Dispatcher";
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

    let url: string = Config.serverUrl + "/teams/" + teamID + "/metrics";

    axios.post(url, metric)
    .then(
        (resp: AxiosResponse) => {
            CreateFetchMetricsAction(teamID);
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}
