import * as React from "react";
import { Link } from 'react-router';
import CustomTable from "../../CustomTable/CustomTable"
import CustomRow from "../../CustomTable/CustomRow"
import FlatButton from 'material-ui/FlatButton';
import {IMatchSummary} from "../../../Models/DatabaseModelsSummaries";

export interface ILayoutProps {
    params: {
        matches: Array<IMatchSummary>
    }
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
        let columns = new Array<String>();

        if(this.props.params.matches.length > 0) {
            columns = ["Équipe locale", "Équipe visiteur", "Emplacement", "Date", "Voir Détails"]
        }

        return columns;
    }

    getTableData() {
        let data = new Array<any>();

        if(this.props.params.matches.length > 0) {
            data = this.props.params.matches.map((match, i) => {
                let rowData: Array<any> = [match.home_team.name,
                    match.away_team.name,
                    match.location,
                    match.date.toDateString(),
                    <FlatButton primary={true} label="Voir" linkButton={true} containerElement={<Link to={"/team/" + this.props.params.team_id + "/matches/" + match.id}/>} />];

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
