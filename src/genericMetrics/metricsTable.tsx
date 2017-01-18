import * as React from "react";

//require('../../sass/Layout.scss');

// Represent the props reveived by the Component GenericMetrics.
export interface IDataProps {}

export interface IDataStates {
    title: string
}

//This component will display all metrics from a team.
export default class MetricsTable extends React.Component<IDataProps, IDataStates> {

    constructor() {
        super();
        this.state = {
            title: "TSAP"
        }
    }

    render() {
    return (
      <table>
        <th>Value</th>
        <th>Type</th>
      </table>
    );
    }
}