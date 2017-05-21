import * as React from "react";
import { Link } from 'react-router';
import CustomTable from "../../CustomTable/CustomTable"
import CustomRow from "../../CustomTable/CustomRow"
import FlatButton from 'material-ui/FlatButton';
import {ITeamSummary} from "../../../models/DatabaseModelsSummaries";
import { IUser } from "../../../Models/DatabaseModels";
import LoginStore from "../../Login/Store";
import BigContent from "../../Elements/BigContent";
import * as ActionsCreator from "../ActionsCreator";
import Spinner from "../../Elements/Spinner";
import TeamStore from "../Store";

export interface ILayoutProps {
}

export interface ILayoutState {
    teams?: Array<ITeamSummary>;
    token?: string;
    loading_teams?: boolean;

}

export default class TeamList extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);

        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

        getToken(){
          this.setState({
            token: LoginStore.token 
        });
    }

        setLoadingStatus() {
        this.setState({
            loading_teams: TeamStore.fetching,
        });
    }

    componentWillMount() {
        TeamStore.on("FETCH_TEAMS", this.setLoadingStatus);
        TeamStore.on("RECEIVE_TEAMS", this.setTeams);

        ActionsCreator.getTeam(this.props.params.team_id, this.state.token);
    }

    componentWillUnmount() {
        TeamStore.removeListener("FETCH_TEAMS", this.setLoadingStatus);
        TeamStore.removeListener("RECEIVE_TEAMS", this.setTeam);
    }

    getTableColumns() {
        let columns: Array<String> = [];

        if(this.props.params.user.teams.length > 0) {
            columns = ["Nom d'équipe", "Ville", "Action"]
        }

        return columns;
    }

    getTableData() {
        let data: Array<any> = [];

        if(this.state.teams.length > 0) {
            data = this.state.teams.map((team, i) => {
            
                let rowData: Array<any> = [team.name,
                   team.city,
                    <FlatButton primary={true} label="Liste de matchs" linkButton={true} containerElement={<Link to={"/team/" + team.id + "matches"}/>} /> ,
                    <FlatButton primary={true} label="Liste de joueurs" linkButton={true} containerElement={<Link to={"/team/" + team.id + "/players"}/>} />];

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
