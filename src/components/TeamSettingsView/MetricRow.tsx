import * as React from "react";

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { Metric } from './MetricModel';

require('../../sass/MetricEditor');


export interface IMetricRowProps {
    metric?: Metric
}

export interface IMetricRowState {
    metric: Metric
}


export default class MetricRow extends React.Component<IMetricRowProps, IMetricRowState> {

    constructor(props: IMetricRowProps) {
        super(props);

        if (this.props.metric) {
            // Metric to edit
            this.state = {
                metric: this.props.metric
            };
        } else {
            // Metric to create
            this.state = {
                metric: new Metric()
            };
        }
    }

    render() {
        return(
            <div className="metric-row">
                <TextField
                    className="form-input"
                    floatingLabelText="Nom"
                    value={this.state.metric.name}
                />

                <TextField
                    className="form-input"
                    floatingLabelText="Description"
                    value={this.state.metric.description}
                />

                <TextField
                    className="form-input"
                    floatingLabelText="Équation"
                    value={this.state.metric.formula}
                />
            </div>

        );
    }
}
