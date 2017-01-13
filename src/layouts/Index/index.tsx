import * as React from "react";
import {ArrowMap} from "../../components/ArrowMap/arrowmap"

require('../../sass/Layout.scss');

export interface ILayoutProps {}

export interface ILayoutState {
    title: string
}

export class Index extends React.Component<ILayoutProps, ILayoutState> {

    constructor() {
        super();
        this.state = {
            title: "TSAP"
        }
    }

    render() {
        return (
            <ArrowMap height={800}></ArrowMap>
        );
    }
}