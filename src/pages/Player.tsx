import * as React from "react";
import {IPlayer, IPlayerStats, ISeason} from "../models/DatabaseModels";
import LoginStore from "../components/Login/Store";
import StatsStore from "../components/PlayerStats/Store";
import {DataPanel} from "../components/DataPanel/index";
import StatsTable from "../components/PlayerStats/StatsTable";
import StatsGraphs from "../components/PlayerStats/StatsGraphs";
import {CreateFetchPlayerStatsAction} from "../components/PlayerStats/Actions/FetchPlayerStats";
import {CreateFetchSeasonsAction} from "../components/PlayerStats/Actions/FetchSeasons";
import AllContainer from "../components/Elements/AllContainer";
import Toolbar from "material-ui/Toolbar";
import ToolbarGroup from "material-ui/Toolbar/ToolbarGroup";
import ToolbarTitle from "material-ui/Toolbar/ToolbarTitle";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import {ToolbarSeparator} from "material-ui/Toolbar/ToolbarSeparator";


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

    handleSelectedSeason(e: any, i: any, value: any) {
        this.setState({
            selectedSeasonID: value
        });
        CreateFetchPlayerStatsAction(this.props.params.teamID, this.props.params.playerID, value, LoginStore.token);
    }

    render() {
        let statsTitle = "Statistiques du joueur";
        let graphTitle = "Progression du joueur";

        let playerName = this.state.player? this.state.player.first_name + " " + this.state.player.last_name: "un joueur";

        let menuItems = this.state.seasons.map((s) => {
            return <MenuItem value={s.id} primaryText={s.start_year.toString() + "-" + s.end_year.toString()} />;
        });

        return (
            <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <DropDownMenu value={this.state.selectedSeasonID} onChange={this.handleSelectedSeason}>
                            {menuItems}
                        </DropDownMenu>
                    </ToolbarGroup>
                </Toolbar>
                <AllContainer>
                    <DataPanel Header={graphTitle} Name={playerName}><StatsGraphs teamID={this.props.params.teamID} /></DataPanel>
                    <DataPanel Header={statsTitle} Name={playerName}><StatsTable teamID={this.props.params.teamID} /></DataPanel>
                </AllContainer>
            </div>
        );
    }
}
