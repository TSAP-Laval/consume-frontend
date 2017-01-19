import * as React from "react";
import {ArrowMap} from "../components/ArrowMap/Index"

import StatsTable from "../components/PlayerStats/StatsTable";

export interface ILayoutProps {}

export interface ILayoutState {}

export class User extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <ArrowMap height={300}/>
                <StatsTable/>
            </div>
        );
    }
}