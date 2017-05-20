import * as React from "react";
import { Link } from 'react-router';
import CustomTable from "../../CustomTable/CustomTable"
import CustomRow from "../../CustomTable/CustomRow"
import FlatButton from 'material-ui/FlatButton';
import {IMatchSummary} from "../../../models/DatabaseModelsSummaries";

export interface ILayoutProps {
    team_id: number
    matches: Array<IMatchSummary>
}

export interface ILayoutState {

}

export default class MatchList extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);

        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    getTableColumns() {
        let columns: Array<String> = [];

        if(this.props.matches.length > 0) {
            columns = ["Équipe locale", "Équipe visiteur", "Date", "Voir Détails"]
        }

        return columns;
    }

    getTableData() {
        let data: Array<any> = [];

        if(this.props.matches.length > 0) {
            data = this.props.matches.map((match, i) => {
                let date: Date = new Date(match.date);

                let rowData: Array<any> = [match.home_team.name,
                    match.away_team.name,
                    date.toLocaleDateString(),
                    <FlatButton primary={true} label="Voir" linkButton={true} containerElement={<Link to={"/team/" + this.props.team_id + "/matches/" + match.id}/>} />];

                return <CustomRow key={i} data={rowData}/>
            })
        }

        return data
    }

    render() {
        let columns = this.getTableColumns();
        let data = this.getTableData();

        if((columns.length + data.length) == 0) {
            return(
                    <h2 className="text-center"><b>Aucune partie trouvée</b></h2>
            )
        } else {
            return(
                <div>
                    <h2 className="text-center"><b>Parties jouées</b></h2>
                    <CustomTable columns={columns}> {data} </CustomTable>
                </div>
            )
        }
    }
}
