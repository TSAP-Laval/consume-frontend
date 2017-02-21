import * as React from "react";

import {Table as MTable, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export interface ITableProps {
    columns: Array<String>,
    data: Array<Array<String>>
};
export interface ITableState {};


export default class Table extends React.Component<ITableProps, ITableState> {

    render() {
        let headers = this.props.columns.map((h, i) => {
            return <TableHeaderColumn key={ i.toString() }><span>{ h }</span></TableHeaderColumn>
        });

        let dataRows = this.props.data.map((r, i) => {
            let boxes = r.map((b, j) => {
                return <TableRowColumn key={j.toString()}><span>{b}</span></TableRowColumn>
            });

            return <TableRow key={ i }>{ boxes }</TableRow>
        });

        return (
            <MTable>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}><TableRow>{ headers } </TableRow></TableHeader>
                <TableBody displayRowCheckbox={false}>
                    { dataRows }
                </TableBody>
            </MTable>
        );
    }
}
