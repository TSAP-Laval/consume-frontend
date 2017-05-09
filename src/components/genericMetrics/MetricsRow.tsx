import * as React from "react";
import { Link } from "react-router"
import { TableRowColumn, TableRow } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';

export interface IRowProps {
    player_id: number,
    team_id: number,
    data: string[],
}

export interface IRowState {
}

export default class MetricsRow extends React.Component<IRowProps, IRowState> {

    render() {
        let boxes = this.props.data.map((b, j) => {
            return <TableRowColumn key={j.toString()}><span>{b}</span></TableRowColumn>
        });

        boxes.push(
            <TableRowColumn key={boxes.length.toString()}>
                <FlatButton primary={true} label="Voir" linkButton={true} containerElement={<Link to={"/team/" + this.props.team_id + "/player/" + this.props.player_id}/>} />
            </TableRowColumn>
        );

        return <TableRow>{ boxes }</TableRow>
    }
}
