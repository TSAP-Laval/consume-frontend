import * as React from "react";
import {ArrowMap} from "../components/Map/ArrowMap/Index"
import {HeatMap} from "../components/HeatMap/Map"

import StatsTable from "../components/PlayerStats/StatsTable";
import StatsGraphs from "../components/PlayerStats/StatsGraphs";

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
        let heatmapTitle = <h3>Heatmap des actions</h3>
        let statsTitle = <h3>Statistiques du joueur</h3>;
        let graphTitle = <h3>Progression du joueur</h3>;

        return (
            <div>
                <Panel header={arrowTitle} className="data-panel"><ArrowMap/></Panel>
                <Panel header={heatmapTitle} className="data-panel"><HeatMap/></Panel>
                <Panel header={statsTitle} className="data-panel"><StatsTable/></Panel>
                <Panel header={graphTitle} className="data-panel"><StatsGraphs Height={300} Width={600} /></Panel>
            </div>
        );
    }
}