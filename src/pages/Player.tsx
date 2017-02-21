import * as React from "react";

import {ArrowMap} from "../components/Map/ArrowMap/Index"
import {HeatMap} from "../components/HeatMap/Map"

import StatsTable from "../components/PlayerStats/StatsTable";
import StatsGraphs from "../components/PlayerStats/StatsGraphs";
import GenericMetricsView from "../components/genericMetrics/GenericMetricsView";
import StatsTableStore from "../components/PlayerStats/store";
import { CreateGetMatchesAction } from "../components/PlayerStats/actions/GetMatchesAction";
import { CreateGetSeasonsAction } from "../components/PlayerStats/actions/GetSeasonsAction";
import { CreateGetPositionsAction } from "../components/PlayerStats/actions/GetPositionsAction";

import { Panel } from "react-bootstrap";

require('../sass/Player.scss');

export interface ILayoutProps {
    params: {
        teamID: number,
        playerID: number
    }
}

export interface ILayoutState {
    playerName?: string
}

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
        let arrowTitle = <h3>Tracé des actions</h3>;
        let heatmapTitle = <h3>Heatmap des actions</h3>
        let statsTitle = <h3>Statistiques du joueur</h3>;
        let graphTitle = <h3>Progression du joueur</h3>;

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
            <div>
                <h2 className="text-center">Statistiques pour <b>{this.state.playerName}</b></h2>
                <Panel header={arrowTitle} className="data-panel"><ArrowMap/></Panel>
                <Panel header={heatmapTitle} className="data-panel"><HeatMap/></Panel>
                <Panel header={graphTitle} className="data-panel"><StatsGraphs playerID={this.props.params.playerID} teamID={this.props.params.teamID} dateLocal={dateLocal} dateOptions ={dateOptions}/></Panel>
                <Panel header={statsTitle} className="data-panel"><StatsTable playerID={this.props.params.playerID} teamID={this.props.params.teamID} dateLocal={dateLocal} dateOptions ={dateOptions}/></Panel>
            </div>
        );
    }
}
