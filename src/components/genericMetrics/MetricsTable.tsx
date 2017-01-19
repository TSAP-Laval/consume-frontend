import * as React from "react";

import { Table as T } from 'react-bootstrap';

//require('../../sass/Layout.scss');

// Represent the props reveived by the Component GenericMetrics.
export interface IDataProps {
    columns: Array<String>,
    data: Array<Array<String>>
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

        let dataRows = this.props.data.map((r, i) => {
            let boxes = r.map((b, j) => {
                return <td key={j}><span>{b}</span></td>
            });

            return <tr key={ i }>{ boxes }</tr>
        });

        return (
            <T striped bordered condensed hover responsive>
                <tbody>
                    <tr>{ headers }</tr>
                    { dataRows }
                </tbody>
            </T>
        );
    }
}