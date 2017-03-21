import * as React from "react";

import styled from 'styled-components';

import { Table, TableBody, TableRow, TableHeader, TableHeaderColumn } from 'material-ui/Table';

// Represent the props reveived by the Component GenericMetrics.
export interface IDataProps {
    columns: Array<String>
}

export interface IDataStates {
    title: string
}

const StyledTable = styled(Table)`
    text-align: center;
`;

//This component will display all metrics from a team.
export default class MetricsTable extends React.Component<IDataProps, IDataStates> {

    render() {
        let headers = this.props.columns.map((h, i) => {
            return <TableHeaderColumn key={ i.toString() }><span>{ h }</span></TableHeaderColumn>
        });

        headers.push(
            <TableHeaderColumn>{ "Voir Détails" }</TableHeaderColumn>
        )

        return (
            <StyledTable className="metrics-table">
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}><TableRow>{ headers }</TableRow></TableHeader>
                <TableBody>
                    { this.props.children }
                </TableBody>
            </StyledTable>
        );
    }
}
