import * as React from "react";
import {ArrowMap} from "../components/ArrowMap/Index"
import {HeatMap} from "../components/HeatMap/Map"

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
                <HeatMap height={300}/>
            </div>

        );
    }
}