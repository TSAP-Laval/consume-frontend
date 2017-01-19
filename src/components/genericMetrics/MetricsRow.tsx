import * as React from "react";

import { Link } from "react-router"

import { Table as T } from 'react-bootstrap';

// Represent the props reveived by the Component GenericMetrics.
export interface IRowProps {
    playerID: number,
    teamID: number,
    Data: string[],
}

export interface IRowState {
}

//This component will display all metrics from a team.
export default class MetricsRow extends React.Component<IRowProps, IRowState> {

    render() {
        let boxes = this.props.Data.map((b, j) => {
            return <td key={j}><span>{b}</span></td>
        });

        boxes.push(
            <td key={boxes.length}><Link to={"/team/" + this.props.teamID + "/player/" + this.props.playerID}>{"Voir"}</Link></td>
        )

        return <tr>{ boxes }</tr>
    }
}