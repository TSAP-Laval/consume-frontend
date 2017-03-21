import * as React from "react";
import { Link } from 'react-router';

import BigContent from "../components/Elements/BigContent";
import FlatButton from 'material-ui/FlatButton';

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
            <BigContent>
                <TeamSettingsView teamId={this.props.params.teamID} />
            </BigContent>
        );
    }
}
