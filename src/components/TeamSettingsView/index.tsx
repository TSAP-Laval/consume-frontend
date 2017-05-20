import * as React from "react";
import { Metric } from './MetricModel';
import MetricRow from './MetricRow';
import MetricStore from './Store';
import { CreateFetchMetricsAction } from './Actions/FetchMetrics';
import Form from "../Elements/Form";
import Spinner from "../Elements/Spinner";


export interface IMetricEditorProps {
    teamId: number
}

export interface IMetricEditorState {
    metrics?: Metric[];
    fetching?: boolean;
}

export default class MetricEditor extends React.Component<IMetricEditorProps, IMetricEditorState> {

    constructor() {
        super();
        this.state = {
            metrics: MetricStore.getMetrics(),
            fetching: MetricStore.getFetching()
        };

        this.getFetching = this.getFetching.bind(this);
        this.getMetrics = this.getMetrics.bind(this);
    }

    componentWillMount() {
        MetricStore.on("fetchStatusChanged", this.getFetching);
        MetricStore.on("metricsChanged", this.getMetrics);

        CreateFetchMetricsAction(this.props.teamId);
    }

    componentWillUnmount() {
        MetricStore.removeListener("fetchStatusChanged", this.getFetching);
        MetricStore.removeListener("metricsChanged", this.getMetrics);
    }

    getFetching() {
        this.setState({
            fetching: MetricStore.getFetching()
        });
    }

    getMetrics() {
        this.setState({
            metrics: MetricStore.getMetrics()
        });
    }

    render() {

        let existingRows = this.state.metrics.map((m) => (
            <MetricRow metric={m} teamID={this.props.teamId} />
        ));

        return(
            this.state.fetching?
            <Spinner />
            :
            <Form>
                <h2>Paramètres de l'équipe</h2>
                <div>
                    <h3>Métriques</h3>
                    {existingRows}
                    <MetricRow teamID={this.props.teamId} />
                </div>
            </Form>
        );
    }
}
