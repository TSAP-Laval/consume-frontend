import * as React from "react";
import styled from 'styled-components';
import {IPlayer, IPlayerStats, ISeason} from "../models/DatabaseModels";
import {CreateFetchPlayerAction} from "../components/PlayerStats/Actions/FetchPlayer";
import LoginStore from "../components/Login/Store";
import StatsStore from "../components/PlayerStats/Store";
import {DataPanel} from "../components/DataPanel/index";
import StatsTable from "../components/PlayerStats/StatsTable";
import StatsGraphs from "../components/PlayerStats/StatsGraphs";
import {CreateFetchPlayerStatsAction} from "../components/PlayerStats/Actions/FetchPlayerStats";
import {CreateFetchSeasonsAction} from "../components/PlayerStats/Actions/FetchSeasons";

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


export interface ILayoutProps {
    params: {
        teamID: number,
        playerID: number
    }
}

export interface ILayoutState {
    player?: IPlayer

    selectedSeasonID?: number
    seasons?: ISeason[]
}

const AllContainer = styled.div`
    margin-top: 2em;
`;

export default class Player extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: ILayoutProps) {
        super(props);
        this.state = {seasons: []};

        this.setPlayer = this.setPlayer.bind(this);
        this.setSeasons = this.setSeasons.bind(this);
        this.handleSelectedSeason = this.handleSelectedSeason.bind(this);
    }

    componentWillMount() {
        StatsStore.on("PlayerChanged", this.setPlayer);
        StatsStore.on("SeasonsChanged", this.setSeasons);

        CreateFetchSeasonsAction(this.props.params.teamID, this.props.params.playerID, LoginStore.token);
    }

    componentWillUnmount() {
        StatsStore.removeListener("PlayerChanged", this.setPlayer);
    }

    setPlayer() {
        this.setState({
            player: StatsStore.player
        });
    }

    setSeasons() {
        this.setState({
            seasons: StatsStore.seasons,
            selectedSeasonID: StatsStore.seasons[StatsStore.seasons.length - 1].id
        })
    }

    handleSelectedSeason(e: any) {
        this.setState({
            selectedSeasonID: e.target.value
        });
        CreateFetchPlayerStatsAction(this.props.params.teamID, this.props.params.playerID, e.target.value, LoginStore.token);
    }

    render() {
        let statsTitle = "Statistiques du joueur";
        let graphTitle = "Progression du joueur";

        let playerName = this.state.player? this.state.player.first_name + " " + this.state.player.last_name: "un joueur";

        let menuItems = this.state.seasons.map((s) => {
            return <option value={s.id} >{s.start_year.toString() + "-" + s.end_year.toString()}</option>;
        });

        return (
            <AllContainer>
                <DataPanel Name={this.state.playerName} Header={graphTitle} ><StatsGraphs playerID={this.props.params.player_id} teamID={this.props.params.teamID} dateLocal={dateLocal} dateOptions ={dateOptions}/></DataPanel>
                <DataPanel Name={this.state.playerName} Header={statsTitle} ><StatsTable playerID={this.props.params.player_id} teamID={this.props.params.teamID} dateLocal={dateLocal} dateOptions ={dateOptions}/></DataPanel>
            </AllContainer>
        );
    }
}
