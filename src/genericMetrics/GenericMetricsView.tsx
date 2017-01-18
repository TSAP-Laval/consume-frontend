import * as React from "react";

import GenericMetricsStore from "../genericMetrics/GenericMetricsStore";

import MetricsTable from "../genericMetrics/MetricsTable";

//require('../../sass/Layout.scss');

// Represent the props reveived by the Component GenericMetrics.
export interface IDataProps {}

export interface IDataStates {
    title: string
}

//This component will display all metrics from a team.
export class GenericMetricsView extends React.Component<IDataProps, IDataStates> {

    constructor() {
        super();
        this.state = {
            title: "TSAP"
        }
    }

    // Will fetch and load the data.
    componentWillMunt(){

    }

    // Will fetch and load the data.
    componentWillUnmunt(){

    }

    render() {
    return (
        <MetricsTable />
    );
    }
}