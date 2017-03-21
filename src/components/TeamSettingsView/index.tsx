import * as React from "react";

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { Metric } from './MetricModel';
import MetricRow from './MetricRow';
import MetricStore from './store';

import { CreateFetchMetricsAction } from './actions/FetchMetrics';

import CircularProgress from 'material-ui/CircularProgress';

require('../../sass/MetricEditor');


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
        MetricStore.on("fetchMetrics", this.getFetching);
        MetricStore.on("metricsReceived", this.getMetrics);

        CreateFetchMetricsAction(this.props.teamId);
    }

    componentWillUnmount() {
        MetricStore.removeListener("fetchMetrics", this.getFetching);
        MetricStore.removeListener("metricsReceived", this.getMetrics);
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
        ))

        return(
            this.state.fetching?
            <div className="loading">
                <h3>{ "Chargement..." }</h3>
                <CircularProgress size={60} thickness={7} />
            </div>
            :
            <div className="main-form">
                <h2>Paramètres de l'équipe</h2>
                <div>
                    <h3>Métriques</h3>
                    {existingRows}
                    <MetricRow teamID={this.props.teamId} />
                </div>
            </div>
        );
    }
}
