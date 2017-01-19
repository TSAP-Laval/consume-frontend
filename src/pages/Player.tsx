import * as React from "react";

import {ArrowMap} from "../components/Map/ArrowMap/Index"

import StatsTable from "../components/PlayerStats/StatsTable";
import StatsGraphs from "../components/PlayerStats/StatsGraphs";
import GenericMetricsView from "../components/genericMetrics/GenericMetricsView";

import { Panel } from "react-bootstrap";

require('../sass/Player.scss');

export interface ILayoutProps {}

export interface ILayoutState {}

export class Player extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();
    }

    render() {
        let arrowTitle = <h3>Tracé des actions</h3>;
        let statsTitle = <h3>Statistiques du joueur</h3>;
        let graphTitle = <h3>Progression du joueur</h3>;
        let statsTeamTitle = <h3>Statistique de l'équipe</h3>; 

        return (
            <div>
                <Panel header={arrowTitle} className="data-panel"><ArrowMap/></Panel>
                <Panel header={statsTitle} className="data-panel"><StatsTable/></Panel>
                <Panel header={graphTitle} className="data-panel"><StatsGraphs Height={300} Width={600} /></Panel>
                <Panel header={statsTeamTitle} className="data-panel"><GenericMetricsView Height={300} Width={600} /></Panel>
            </div>
        );
    }
}