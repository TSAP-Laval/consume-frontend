import * as React from "react";
import styled from 'styled-components';
import {IPlayer} from "../models/DatabaseModels";
import {CreateFetchPlayerAction} from "../components/PlayerStats/Actions/FetchPlayer";
import LoginStore from "../components/Login/Store";
import StatsStore from "../components/PlayerStats/Store";
import {DataPanel} from "../components/DataPanel/index";
import StatsTable from "../components/PlayerStats/StatsTable";
import StatsGraphs from "../components/PlayerStats/StatsGraphs";
import {CreateFetchPlayerStatsAction} from "../components/PlayerStats/Actions/FetchPlayerStats";


export interface ILayoutProps {
    params: {
        teamID: number,
        playerID: number
    }
}

export interface ILayoutState {
    player?: IPlayer
}

const AllContainer = styled.div`
    margin-top: 2em;
`;

export default class Player extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: ILayoutProps) {
        super(props);
        this.state = {};

        this.setPlayer = this.setPlayer.bind(this);
    }

    componentWillMount() {
        StatsStore.on("PlayerChanged", this.setPlayer);
        CreateFetchPlayerAction(this.props.params.teamID, this.props.params.playerID, LoginStore.token);
        CreateFetchPlayerStatsAction(this.props.params.teamID, this.props.params.playerID, LoginStore.token);
    }

    componentWillUnmount() {
        StatsStore.removeListener("PlayerChanged", this.setPlayer);
    }

    setPlayer() {
        this.setState({
            player: StatsStore.player
        });
    }

    render() {
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

        let playerName = this.state.player? this.state.player.first_name + " " + this.state.player.last_name: "un joueur";

        return (
            <AllContainer>
                <DataPanel PlayerName={playerName} Header={graphTitle} ><StatsGraphs /></DataPanel>
                <DataPanel PlayerName={playerName} Header={statsTitle} ><StatsTable teamID={this.props.params.teamID} /></DataPanel>
            </AllContainer>
        );
    }
}
