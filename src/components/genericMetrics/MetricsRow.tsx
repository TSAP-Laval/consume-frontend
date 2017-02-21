import * as React from "react";

import { Link } from "react-router"

import { TableRowColumn, TableRow } from 'material-ui/Table';

import FlatButton from 'material-ui/FlatButton';

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
            return <TableRowColumn key={j.toString()}><span>{b}</span></TableRowColumn>
        });

        boxes.push(
            <TableRowColumn key={boxes.length.toString()}>
                <FlatButton primary={true} label="Voir" linkButton={true} containerElement={<Link to={"/team/" + this.props.teamID + "/player/" + this.props.playerID}/>} />
            </TableRowColumn>
        )

        return <TableRow>{ boxes }</TableRow>
    }
}
