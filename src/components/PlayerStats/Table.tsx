import * as React from "react";

export interface ITableProps {
    columns: Array<String>,
    data: Array<Array<String>>
};
export interface ITableState {};


export default class Table extends React.Component<ITableProps, ITableState> {

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
            <table frameBorder={1}>
            <tbody>
                <tr>{ headers }</tr>
                { dataRows }
            </tbody>
            </table>
        );
    }
}
