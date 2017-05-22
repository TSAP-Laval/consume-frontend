import * as React from "react";
import ActionStore from "../components/Action/Store"
import * as ActionsCreator from "../components/Action/ActionsCreator"
import BigContent from "../components/Elements/BigContent";
import {ActionMapComponent} from "../components/Action/ActionMap/Views/ActionMap";
import {HeatMapComponent} from "../components/Action/HeatMap/Views/HeatMap";

export interface ILayoutProps {
    params: {
        team_id: number,
        match_id: number
    }
}

export interface ILayoutState {}

export default class MatchView extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);
    }

    componentDidMount() {
        if(!ActionStore.actionsExists(this.props.params.match_id)) {
            ActionsCreator.FetchMapSize(this.props.params.team_id);
            ActionsCreator.FetchMatchActions(this.props.params.team_id, this.props.params.match_id)
        }
    }

    render() {
        return (
            <BigContent>
                <ActionMapComponent match_id={this.props.params.match_id}/>
                <HeatMapComponent match_id={this.props.params.match_id} team_id={this.props.params.team_id}/>
            </BigContent>
        )
    }
}