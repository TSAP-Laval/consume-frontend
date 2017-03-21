import * as React from "react";

import RaisedButton from 'material-ui/RaisedButton';

import { CreateCreateMetricAction } from "./actions/CreateMetric";

import { Metric } from './MetricModel';

import FormInput from "../Elements/FormInput";


export interface IMetricRowProps {
    metric?: Metric
    teamID: number
}

export interface IMetricRowState {
    metric?: Metric;
    nameError?: string;
    descError?: string;
    formulaError?: string;
}


export default class MetricRow extends React.Component<IMetricRowProps, IMetricRowState> {

    constructor(props: IMetricRowProps) {
        super(props);

        let metric = this.props.metric? this.props.metric: new Metric();

        this.state = {
            metric: metric,
            nameError: "",
            descError: "",
            formulaError: ""
        };

        this.handleSave = this.handleSave.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeDesc = this.changeDesc.bind(this);
        this.changeFormula = this.changeFormula.bind(this);
    }

    changeName(e: any) {
        let oldMetric = this.state.metric;
        oldMetric.name = e.target.value;

        this.setState({
            metric: oldMetric
        });
    }

    changeDesc(e: any) {
        let oldMetric = this.state.metric;
        oldMetric.description = e.target.value

        this.setState({
            metric: oldMetric
        });
    }

    changeFormula(e: any) {
        let oldMetric = this.state.metric;
        oldMetric.formula = e.target.value;

        this.setState({
            metric: oldMetric
        });
    }

    handleSave(e: React.FocusEvent<any>) {

        let metric = this.state.metric;

        let valid = true;
        let nameError = "";
        let descError = "";
        let formulaError = "";

        if (!metric.name) {
            nameError = "Nom est obligatoire"
        }
        if (!metric.description) {
            descError = "Description est obligatoire"
        }

        if (!metric.formula) {
            formulaError = "Équation est obligatoire"
        }

        this.setState({
            nameError: nameError,
            descError: descError,
            formulaError: formulaError
        });

        if (!metric.isValid()) {
            return;
        }

        if (this.state.metric.id) {
            // Update the metric
            // TODO: Geb: Code update de métrique ici
        } else {
            // Create the metric
            CreateCreateMetricAction(this.state.metric, this.props.teamID);
        }
    }

    render() {
        return(
            <div className="metric-row">
                <FormInput
                    floatingLabelText="Nom"
                    value={this.state.metric.name}
                    onChange={this.changeName}
                    onBlur={this.handleSave}
                    errorText={this.state.nameError}
                />

                <FormInput
                    floatingLabelText="Description"
                    value={this.state.metric.description}
                    onChange={this.changeDesc}
                    onBlur={this.handleSave}
                    errorText={this.state.descError}
                />

                <FormInput
                    floatingLabelText="Équation"
                    value={this.state.metric.formula}
                    onChange={this.changeFormula}
                    onBlur={this.handleSave}
                    errorText={this.state.formulaError}
                />
            </div>
        );
    }
}
