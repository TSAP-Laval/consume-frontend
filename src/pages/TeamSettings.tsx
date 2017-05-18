import * as React from "react";
import BigContent from "../components/Elements/BigContent";
import TeamSettingsView from "../components/TeamSettingsView";

export interface ILayoutProps {
    params?: {
        teamID: number
    }
}

export interface ILayoutState {

}

export default class Team extends React.Component<ILayoutProps, ILayoutState> {
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
