import * as React from "react";
import styled from 'styled-components';
import { Table, TableBody, TableRow, TableHeader, TableHeaderColumn } from 'material-ui/Table';

export interface IDataProps {
    columns: Array<String>
}

export interface IDataStates {
    title: string
}

const StyledTable = styled(Table)`
    text-align: center;
`;

export default class CustomTable extends React.Component<IDataProps, IDataStates> {
    render() {
        let headers = this.props.columns.map((h, i) => {
            return <TableHeaderColumn key={ i.toString() }>{h}</TableHeaderColumn>
        });

        return (
            <StyledTable className="custom-table">
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}><TableRow>{ headers }</TableRow></TableHeader>
                <TableBody>
                    { this.props.children }
                </TableBody>
            </StyledTable>
        );
    }
}
