import * as React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import { CreateUpdateMetricAction } from "./Actions/UpdateMetric";
import { CreateCreateMetricAction } from "./Actions/CreateMetric";
import { CreateDeleteMetricAction } from "./Actions/DeleteMetric";
import { Metric } from './MetricModel';
import FormInput from "../Elements/FormInput";
import LoginStore from "../Login/Store";

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
        this.deleteMetric = this.deleteMetric.bind(this);
    }

    deleteMetric() {
        CreateDeleteMetricAction(this.state.metric.id, this.props.teamID, LoginStore.token)
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
        oldMetric.description = e.target.value;

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

        if (![metric.name, metric.description, metric.formula].every((x) => (x != undefined && x != ""))) {
            return;
        }

        if (this.state.metric.id) {
            CreateUpdateMetricAction(this.state.metric, this.props.teamID, LoginStore.token);
        } else {
            CreateCreateMetricAction(this.state.metric, this.props.teamID, LoginStore.token);
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

                <RaisedButton
                    label="Supprimer"
                    onClick={this.deleteMetric}
                />
            </div>
        );
    }
}
