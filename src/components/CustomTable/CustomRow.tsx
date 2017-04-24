import * as React from "react";

import { Link } from "react-router"

import { TableRowColumn, TableRow } from 'material-ui/Table';

import FlatButton from 'material-ui/FlatButton';

// Represent the props reveived by the Component GenericMetrics.
export interface IRowProps {
    data: any[]
}

export interface IRowState {
}

//This component will display all metrics from a team.
export default class CustomRow extends React.Component<IRowProps, IRowState> {

    render() {
        let boxes = this.props.data.map((b, j) => {
            return <TableRowColumn key={j.toString()}><span>{b}</span></TableRowColumn>
        });

        return <TableRow className="custom-row">{ boxes }</TableRow>
    }
}
