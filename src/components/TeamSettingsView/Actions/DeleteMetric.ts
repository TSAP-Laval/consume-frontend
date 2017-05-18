import { IAction } from "../../../models/ActionCreation";
import { CreateErrorAction } from "../../Error/ErrorAction";
import { CreateFetchMetricsAction } from './FetchMetrics';
import axios, {AxiosResponse} from 'axios';
import dispatcher from "../../Dispatcher";
import * as Config from 'Config';


export class DeleteMetricAction implements IAction {
    type: string;

    constructor() {
        this.type = "DELETE_METRIC";
    }
}

export function CreateDeleteMetricAction(metricID: number, teamID: number) {
    dispatcher.dispatch(new DeleteMetricAction());

    let url: string = Config.serverUrl + "/teams/" + teamID + "/metrics/" + metricID.toString();

    if (!metricID) {
        return;
    }

    axios.delete(url)
    .then(
        (resp: AxiosResponse) => {
            CreateFetchMetricsAction(teamID);
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}
