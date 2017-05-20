import * as React from "react";
import { Link } from 'react-router';
import CustomTable from "../../CustomTable/CustomTable"
import CustomRow from "../../CustomTable/CustomRow"
import FlatButton from 'material-ui/FlatButton';
import {ITeamSummary} from "../../../models/DatabaseModelsSummaries";

export interface ILayoutProps {
    params: {
        teams: Array<ITeamSummary>
    }
}

export interface ILayoutState {

}

export default class TeamList extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);

        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    getTableColumns() {
        let columns: Array<String> = [];

        if(this.props.params.teams.length > 0) {
            columns = ["Nom d'équipe", "Ville", "Action"]
        }

        return columns;
    }

    getTableData() {
        let data: Array<any> = [];

        if(this.props.params.teams.length > 0) {
            data = this.props.params.teams.map((team, i) => {
            
                let rowData: Array<any> = [team.name,
                   team.city,
                    <FlatButton primary={true} label="Liste de matchs" linkButton={true} containerElement={<Link to={"/team/" + this.props.params.team_id + "/matches/" + match.id}/>} /> 
                    <FlatButton primary={true} label="Liste de joueurs" linkButton={true} containerElement={<Link to={"/team/" + this.props.params.team_id + "/matches/" + match.id}/>} />];

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
                    <h2 className="text-center"><b>Aucune équipe trouvée</b></h2>
            )
        } else {
            return(
                <div>
                    <h2 className="text-center"><b>Mes équipes</b></h2>
                    <CustomTable columns={columns}> {data} </CustomTable>
                </div>
            )
        }
    }
}
