import * as React from "react";
import ActionStore from "../components/Action/Store"
import * as ActionsActionsCreator from "../components/Action/ActionsCreator"
import * as PreferencesActionsCreator from "../components/Preferences/ActionsCreator"
import BigContent from "../components/Elements/BigContent";
import {ActionMapComponent} from "../components/Action/ActionMap/Views/ActionMap";
import {HeatMapComponent} from "../components/Action/HeatMap/Views/HeatMap";
import LoginStore from "../components/Login/Store";
import TeamStore from "../components/Team/Stores/TeamStore";
import {DataPanel} from "../components/DataPanel/index";
import {Container} from "konva";

export interface ILayoutProps {
    params: {
        team_id: number,
        match_id: number
    }
}

export interface ILayoutState {
    team_name: string
}

export default class MatchView extends React.Component<ILayoutProps, ILayoutState> {

    readonly actions_title = "Tracé des actions";
    readonly heatmap_title = "Heatmap des actions";
    constructor(props: ILayoutProps) {
        super(props);

        this.state = {
            team_name: ""
        }
    }

    componentDidMount() {
        if(!ActionStore.actionsExists(this.props.params.match_id)) {
            PreferencesActionsCreator.FetchMapSize(this.props.params.team_id, LoginStore.token);
            ActionsActionsCreator.FetchMatchActions(this.props.params.team_id, this.props.params.match_id, LoginStore.token)
        }
        this.setState({
            team_name: TeamStore.getTeam(this.props.params.team_id).name
        });

    }

    render() {
        return (
            <div>
                <DataPanel Name={this.state.team_name} Header={this.actions_title}>
                    <ActionMapComponent match_id={this.props.params.match_id}/>
                </DataPanel>

                <DataPanel Name={this.state.team_name} Header={this.heatmap_title}>
                    <HeatMapComponent match_id={this.props.params.match_id} team_id={this.props.params.team_id}/>
                </DataPanel>
            </div>
        )
    }
}