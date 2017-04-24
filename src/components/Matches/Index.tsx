import * as React from "react";
import { Link } from 'react-router';

import Spinner from "../Elements/Spinner";
import CustomTable from "../CustomTable/CustomTable"
import CustomRow from "../CustomTable/CustomRow"
import FlatButton from 'material-ui/FlatButton';

import MatchesStore from "./Store"
import {Match} from "./Models"
import * as ActionsCreator from "./ActionsCreator"

export interface ILayoutProps {
    teamID: number
}

export interface ILayoutState {
    loading?: boolean,
    matches?: Array<Match>
}

export default class Matches extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props)

        this.state = {
            loading: false,
            matches : new Array<Match>()
        }

        this.setLoadingStatus = this.setLoadingStatus.bind(this)
        this.setMatches = this.setMatches.bind(this)
        this.getTableColumns = this.getTableColumns.bind(this)
        this.getTableData = this.getTableData.bind(this)
    }

    setLoadingStatus() {
        this.setState({
            loading: MatchesStore.fetching
        })
    }

    setMatches() {
        this.setState({
            loading: MatchesStore.fetching,
            matches: MatchesStore.matches
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
                match.date,
                <FlatButton primary={true} label="Voir" linkButton={true} containerElement={<Link to={"/team/" + this.props.teamID + "/matches/" + match.match_id}/>} />]
            })
        }

        return data
    }

    componentWillMount() {
        MatchesStore.on("FETCH_MATCHES", this.setLoadingStatus)
        MatchesStore.on("RECEIVE_MATCHES", this.setMatches)
    }

    componentWillUnmount() {
        MatchesStore.removeListener("FETCH_MATCHES", this.setLoadingStatus)
        MatchesStore.removeListener("RECEIVE_MATCHES", this.setMatches)
    }

    componentDidMount() {
        ActionsCreator.getAllTeamMatches(this.props.teamID)
    }

    render() {
        if(!this.state.loading) {
            let columns = this.getTableColumns()
            let data = this.getTableData()

            return(
                <div>
                    <h2 className="text-center"><b>Parties Jouées</b></h2>
                    <CustomTable columns={columns}>
                        {data}
                    </CustomTable>
                </div>
            )
        } else {
            return(<Spinner />)
        }
    }
}