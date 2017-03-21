import * as React from "react";
import { Link } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import TeamSettingsView from "../components/TeamSettingsView";

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
            <Paper className="main-content">
                <TeamSettingsView teamId={this.props.params.teamID} />
            </Paper>
        );
    }
}
