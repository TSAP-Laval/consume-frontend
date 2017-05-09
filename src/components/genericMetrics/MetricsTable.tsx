import * as React from "react";
import Styled from 'styled-components';
import { Table, TableBody, TableRow, TableHeader, TableHeaderColumn } from 'material-ui/Table';

export interface IDataProps {
    columns: Array<Array<String>>
}

export interface IDataStates {
    title: string
}

const StyledTable = Styled(Table)`
    text-align: center;
`;

export default class MetricsTable extends React.Component<IDataProps, IDataStates> {

    render() {
        let headers = this.props.columns.map((h, i) => {
            return <TableHeaderColumn key={ i.toString() }><span>{ h[0] }</span><br/>{h[1]}</TableHeaderColumn>
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
