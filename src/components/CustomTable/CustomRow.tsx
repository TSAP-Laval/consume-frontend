import * as React from "react";
import { TableRowColumn, TableRow } from 'material-ui/Table';

export interface IRowProps {
    data: any[]
}

export interface IRowState {
}

export default class CustomRow extends React.Component<IRowProps, IRowState> {

    render() {
        let boxes = this.props.data.map((b, j) => {
            return <TableRowColumn key={j.toString()}><span>{b}</span></TableRowColumn>
        });

        return <TableRow className="custom-row">{ boxes }</TableRow>
    }
}
