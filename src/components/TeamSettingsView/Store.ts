import { EventEmitter } from "events";
import  {IAction}  from "../../models/ActionCreation";
import dispatcher from "../Dispatcher";
import { Metric } from './MetricModel';
import { MetricsReceived } from './Actions/MetricsReceived';


class MetricStore extends EventEmitter {
    metrics: Metric[];

    fetching: boolean;

    constructor() {
        super();
        this.metrics = [];
        this.fetching = false;
    }

    getFetching(): boolean {
        return this.fetching;
    }

    getMetrics(): Metric[] {
        return this.metrics;
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "FETCH_METRICS":
                this.fetching = true;
                this.emit("fetchStatusChanged");
                break;

            case "METRICS_RECEIVED":
                this.fetching = false;
                let act = action as MetricsReceived;
                this.metrics = act.metrics;
                this.emit('metricsChanged');
                this.emit('fetchStatusChanged');
                break;
        }
    }
}

const store = new MetricStore();
dispatcher.register(store.handleActions.bind(store));
export default store;
