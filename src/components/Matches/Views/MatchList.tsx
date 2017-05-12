import * as React from "react";
import { Link } from 'react-router';
import Spinner from "../../Elements/Spinner";
import CustomTable from "../../CustomTable/CustomTable"
import CustomRow from "../../CustomTable/CustomRow"
import FlatButton from 'material-ui/FlatButton';
import {IMatch} from "../../../Models/DatabaseModels";
import MatchStore from "../Store";
import * as ActionsCreator from "../ActionsCreator"

export interface ILayoutProps {
    params: {
        team_id: number
    }
}

export interface ILayoutState {
    loading?: boolean,
    matches?: Array<IMatch>
}

export default class MatchList extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);

        this.state = {
            matches : new Array<IMatch>()
        };

        this.setLoadingStatus = this.setLoadingStatus.bind(this);
        this.setMatches = this.setMatches.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    setLoadingStatus() {
        this.setState({
            loading: MatchStore.fetching
        })
    }

    setMatches() {
        this.setState({
            loading: MatchStore.fetching,
            matches: MatchStore.matches
        })
    }

    getTableColumns() {
        let columns = new Array<String>();

        if(this.state.matches.length > 0) {
            columns = ["Équipe locale", "Équipe visiteur", "Emplacement", "Date", "Voir Détails"]
        }

        return columns;
    }

    getTableData() {
        let data = new Array<any>();

        if(this.state.matches.length > 0) {
            data = this.state.matches.map((match, i) => {
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

    componentWillMount() {
        MatchStore.on("FETCH_MATCHES", this.setLoadingStatus);
        MatchStore.on("RECEIVE_MATCHES", this.setMatches);

        ActionsCreator.getAllTeamMatches(this.props.params.team_id);
    }

    componentWillUnmount() {
        MatchStore.removeListener("FETCH_MATCHES", this.setLoadingStatus);
        MatchStore.removeListener("RECEIVE_MATCHES", this.setMatches);
    }

    render() {
        if(!this.state.loading) {
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
        } else {
            return(<Spinner />)
        }
    }
}
