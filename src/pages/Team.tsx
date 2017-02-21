import * as React from "react";

import GenericMetricsView from "../components/genericMetrics/GenericMetricsView";

import Paper from 'material-ui/Paper';

require('../sass/Team.scss');

export interface ITeamProps {
    params?: {
        teamID: number
    }
}

export interface ITeamState {}

export default class Team extends React.Component<ITeamProps, ITeamState> {

    constructor() {
        super();
    }

    render() {
        let teamStatsTitle = <h3>Satistiques de la saison en cours</h3>
        return (
            <Paper className="main-content">
                <GenericMetricsView teamID={this.props.params.teamID}/>
            </Paper>
        );
    }
}
