import * as React from "react";
import styled from 'styled-components';
import {ActionMap} from "../components/Map/ActionMap/Index"
import {HeatMap} from "../components/Map/HeatMap/Index"

import StatsTable from "../components/PlayerStats/StatsTable";
import StatsGraphs from "../components/PlayerStats/StatsGraphs";
import StatsTableStore from "../components/PlayerStats/Store";
import { CreateGetMatchesAction } from "../components/PlayerStats/Actions/GetMatchesAction";
import { CreateGetSeasonsAction } from "../components/PlayerStats/Actions/GetSeasonsAction";
import { CreateGetPositionsAction } from "../components/PlayerStats/Actions/GetPositionsAction";

import { DataPanel } from "../components/DataPanel";

export interface ILayoutProps {
    params: {
        teamID: number,
        player_id: number
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
        super(props);
        this.getPlayerName = this.getPlayerName.bind(this);

        this.state = {
            playerName: 'un joueur'
        }
    }

    componentWillMount() {
        StatsTableStore.on("dataChange", this.getPlayerName);

        CreateGetSeasonsAction();
        CreateGetPositionsAction(this.props.params.player_id);
        CreateGetMatchesAction(this.props.params.player_id, this.props.params.teamID);
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
        let arrowTitle = "Tracé des Action";
        let heatmapTitle = "Heatmap des Action";
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
                <DataPanel PlayerName={this.state.playerName} Header={arrowTitle}><ActionMap playerID={this.props.params.player_id} teamID={this.props.params.teamID}/></DataPanel>
                <DataPanel PlayerName={this.state.playerName} Header={heatmapTitle} ><HeatMap playerID={this.props.params.player_id} teamID={this.props.params.teamID}/></DataPanel>

                <DataPanel PlayerName={this.state.playerName} Header={graphTitle} ><StatsGraphs playerID={this.props.params.player_id} teamID={this.props.params.teamID} dateLocal={dateLocal} dateOptions ={dateOptions}/></DataPanel>
                <DataPanel PlayerName={this.state.playerName} Header={statsTitle} ><StatsTable playerID={this.props.params.player_id} teamID={this.props.params.teamID} dateLocal={dateLocal} dateOptions ={dateOptions}/></DataPanel>
            </AllContainer>
        );
    }
}
