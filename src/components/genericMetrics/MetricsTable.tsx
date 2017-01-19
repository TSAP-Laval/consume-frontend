import * as React from "react";

import { Table as T } from 'react-bootstrap';

//require('../../sass/Layout.scss');

// Represent the props reveived by the Component GenericMetrics.
export interface IDataProps {
    columns: Array<String>
}

export interface IDataStates {
    title: string
}

//This component will display all metrics from a team.
export default class MetricsTable extends React.Component<IDataProps, IDataStates> {

    render() {
        let headers = this.props.columns.map((h, i) => {
            return <th key={ i }><span>{ h }</span></th>
        });

        headers.push(
            <th>{ "Voir Détails" }</th>
        )

        return (
            <T striped bordered condensed hover responsive>
                <tbody>
                    <tr>{ headers }</tr>
                    { this.props.children }
                </tbody>
            </T>
        );
    }
}