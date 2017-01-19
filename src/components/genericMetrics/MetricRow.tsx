import * as React from "react";

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
export default class MetricRow extends React.Component<IDataProps, IDataStates> {
 
    // On va récupérer les props ici pour en faire une row.
    constructor() {
        super();
    }

    render() {
    return (
        <tbody>
            <tr>
                <td>Test</td>
                <td>String</td>
            </tr>
      </tbody>
    );
    }
}