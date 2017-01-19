import * as React from "react";
import {ArrowMap} from "../components/Map/ArrowMap/Index"

import StatsTable from "../components/PlayerStats/StatsTable";
import StatsGraphs from "../components/PlayerStats/StatsGraphs";

export interface ILayoutProps {}

export interface ILayoutState {}

export class User extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <ArrowMap height={600}/>
                <StatsTable/>
                <StatsGraphs Height={300} Width={600} />
            </div>
        );
    }
}