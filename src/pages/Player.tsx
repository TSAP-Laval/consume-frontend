import * as React from "react";

import styled from 'styled-components';

import ActionMap from "../components/Map/ActionMap/Index"
import {HeatMap} from "../components/Map/HeatMap/Index"

import StatsTable from "../components/PlayerStats/StatsTable";
import StatsGraphs from "../components/PlayerStats/StatsGraphs";
import GenericMetricsView from "../components/genericMetrics/GenericMetricsView";
import StatsTableStore from "../components/PlayerStats/store";
import { CreateGetMatchesAction } from "../components/PlayerStats/actions/GetMatchesAction";
import { CreateGetSeasonsAction } from "../components/PlayerStats/actions/GetSeasonsAction";
import { CreateGetPositionsAction } from "../components/PlayerStats/actions/GetPositionsAction";

import { DataPanel } from "../components/DataPanel";

import Paper from 'material-ui/Paper';

export interface ILayoutProps {
    params: {
        teamID: number,
        playerID: number
    }
}

export interface ILayoutState {
    playerName?: string
}

const AllContainer = styled.div`
    margin-top: 2em;
`;

export default class Player extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: ILayoutProps) {
        super();
        this.getPlayerName = this.getPlayerName.bind(this);

        this.state = {
            playerName: 'un joueur'
        }
    }

    componentWillMount() {
        StatsTableStore.on("dataChange", this.getPlayerName);

        CreateGetSeasonsAction();
        CreateGetPositionsAction(this.props.params.playerID);
        CreateGetMatchesAction(this.props.params.playerID, this.props.params.teamID);
    }

    componentWillUnmount() {
        StatsTableStore.removeListener("dataChange", this.getPlayerName);
    }

    // Va récupérer les joueurs du store.
     getPlayerName() {
        this.setState({
            playerName: StatsTableStore.getPlayerName()
        });
    }

    render() {
        let arrowTitle = "Tracé des actions";
        let heatmapTitle = "Heatmap des actions";
        let statsTitle = "Statistiques du joueur";
        let graphTitle = "Progression du joueur";

        // Les options de la date.
        let dateOptions = {
        weekday: "short",
        year: "numeric",
        month:"short",
        day:"numeric"
    };
        // Format local de la date.
        let dateLocal = "fr-CA";

        return (
            <AllContainer>
                <DataPanel PlayerName={this.state.playerName} Header={graphTitle} ><StatsGraphs playerID={this.props.params.playerID} teamID={this.props.params.teamID} dateLocal={dateLocal} dateOptions ={dateOptions}/></DataPanel>
                <DataPanel PlayerName={this.state.playerName} Header={statsTitle} ><StatsTable playerID={this.props.params.playerID} teamID={this.props.params.teamID} dateLocal={dateLocal} dateOptions ={dateOptions}/></DataPanel>
            </AllContainer>
        );
    }
}
