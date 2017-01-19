import * as React from "react";

import { Panel } from 'react-bootstrap';

import GenericMetricsView from "../components/genericMetrics/GenericMetricsView";

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
        return (
            <Panel className="data-panel"><GenericMetricsView teamID={this.props.params.teamID}/></Panel>
        );
    }
}