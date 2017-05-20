import * as React from "react";
import { Link } from 'react-router';
import CustomTable from "../../CustomTable/CustomTable"
import CustomRow from "../../CustomTable/CustomRow"
import FlatButton from 'material-ui/FlatButton';
import {IMatchSummary} from "../../../models/DatabaseModelsSummaries";
import Spinner from "../../Elements/Spinner";
import TeamStore from "../Stores/TeamStore"
import * as ActionsCreator from "../ActionsCreator"
import BigContent from "../../Elements/BigContent";

export interface ILayoutProps {
    params: {
        team_id: number
    }
}

export interface ILayoutState {
    loading?: boolean,
    matches?: Array<IMatchSummary>
}

export default class MatchList extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);

        this.state = {
            loading: true
        };

        this.setLoadingStatus = this.setLoadingStatus.bind(this);
        this.setMatches = this.setMatches.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    componentWillMount() {
        TeamStore.on("FETCH_TEAM", this.setLoadingStatus);
        TeamStore.on("RECEIVE_TEAM", this.setMatches);
    }

    componentDidMount() {
        if(TeamStore.teamExists(this.props.params.team_id)) {
            this.setMatches();
        } else {
            ActionsCreator.FetchTeam(this.props.params.team_id);
        }
    }

    componentWillUnmount() {
        TeamStore.removeListener("FETCH_TEAM", this.setLoadingStatus);
        TeamStore.removeListener("RECEIVE_TEAM", this.setMatches);
    }

    setLoadingStatus() {
        this.setState({
            loading: TeamStore.fetching
        })
    }

    setMatches() {
        this.setState({
            loading: TeamStore.fetching,
            matches: TeamStore.teams[this.props.params.team_id.toString()].matches
        })
    }

    getTableColumns() {
        let columns: Array<Array<String>> = [];

        if(this.state.matches.length > 0) {
            columns = [["Équipe locale"], ["Équipe visiteur"], ["Date"], ["Voir Détails"]];
        }

        return columns;
    }

    getTableData() {
        let data: Array<any> = [];

        if(this.state.matches.length > 0) {
            data = this.state.matches.map((match, i) => {
                let date: Date = new Date(match.date);

                let rowData: Array<any> = [match.home_team.name,
                    match.away_team.name,
                    date.toLocaleDateString(),
                    <FlatButton primary={true} label="Voir" linkButton={true} containerElement={<Link to={"/team/" + this.props.params.team_id + "/matches/" + match.id}/>} />];

                return <CustomRow key={i} data={rowData}/>
            })
        }

        return data
    }

    render() {
        if(!this.state.loading) {
            let columns = this.getTableColumns();
            let data = this.getTableData();

            if ((columns.length + data.length) == 0) {
                return (
                    <BigContent><h2 className="text-center"><b>Aucune partie trouvée</b></h2></BigContent>
                )
            } else {
                return (
                    <BigContent>
                        <h2 className="text-center"><b>Parties jouées</b></h2>
                        <CustomTable columns={columns}> {data} </CustomTable>
                    </BigContent>
                )
            }
        } else {
            return(<BigContent><Spinner/></BigContent>)
        }
    }
}
