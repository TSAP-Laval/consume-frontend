import * as React from "react";
import { Link } from 'react-router';

import Spinner from "../../Elements/Spinner";
import BigContent from "../../Elements/BigContent"
import CustomTable from "../../CustomTable/CustomTable"
import CustomRow from "../../CustomTable/CustomRow"
import FlatButton from 'material-ui/FlatButton';

import MatchStore from "../Stores/MatchStore"
import {Match} from "../Models"
import * as ActionsCreator from "../ActionsCreator"

export interface ILayoutProps {
    params: {
        teamID: number
    }
}

export interface ILayoutState {
    loading?: boolean,
    matches?: Array<Match>
}

export default class MatchList extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props)

        this.state = {
            matches : new Array<Match>()
        }

        this.setLoadingStatus = this.setLoadingStatus.bind(this)
        this.setMatches = this.setMatches.bind(this)
        this.getTableColumns = this.getTableColumns.bind(this)
        this.getTableData = this.getTableData.bind(this)
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
        let columns = new Array<String>()

        if(this.state.matches.length > 0) {
            columns = ["Équipe locale", "Équipe visiteur", "Emplacement", "Date", "Voir Détails"]
        }

        return columns
    }

    getTableData() {
        let data = new Array<any>()

        if(this.state.matches.length > 0) {
            data = this.state.matches.map((match, i) => {
                let rowData = new Array<any>()
                rowData = [match.home_team.name, 
                match.away_team.name, 
                match.location, 
                match.date.toDateString(),
                <FlatButton primary={true} label="Voir" linkButton={true} containerElement={<Link to={"/team/" + this.props.params.teamID + "/matches/" + match.match_id}/>} />]

                return <CustomRow key={i} data={rowData}></CustomRow>
            })
        }
        
        return data
    }

    componentWillMount() {
        MatchStore.on("FETCH_MATCHES", this.setLoadingStatus)
        MatchStore.on("RECEIVE_MATCHES", this.setMatches)

        ActionsCreator.getAllTeamMatches(this.props.params.teamID)
    }

    componentWillUnmount() {
        MatchStore.removeListener("FETCH_MATCHES", this.setLoadingStatus)
        MatchStore.removeListener("RECEIVE_MATCHES", this.setMatches)
    }

    render() {
        if(!this.state.loading) {
            let columns = this.getTableColumns()
            let data = this.getTableData()

            console.log(data)

            if((columns.length + data.length) == 0) {
                return(
                    <BigContent>
                        <h2 className="text-center"><b>Aucune partie trouvée</b></h2>
                    </BigContent>
                )
            } else {
                return(
                    <BigContent>
                        <h2 className="text-center"><b>Parties jouées</b></h2>
                        <CustomTable columns={columns}> {data} </CustomTable>
                    </BigContent>
                )
            }
        } else {
            return(<BigContent><Spinner /></BigContent>)
        }
    }
}