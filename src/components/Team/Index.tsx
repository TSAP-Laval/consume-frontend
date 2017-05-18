import * as React from "react";
import Spinner from "../Elements/Spinner";
import {ITeam} from "../../models/DatabaseModels";
import TeamStore from "./Store";
import * as ActionsCreator from "./ActionsCreator"

export interface ILayoutProps {
    params: {
        team_id: number
    }
}

export interface ILayoutState {
    loading?: boolean,
    team?: ITeam
}

export default class MatchList extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);

        this.setLoadingStatus = this.setLoadingStatus.bind(this);
        this.setTeam = this.setTeam.bind(this);
    }

    setLoadingStatus() {
        this.setState({
            loading: TeamStore.fetching
        })
    }

    setTeam() {
        this.setState({
            loading: TeamStore.fetching,
            team: TeamStore.team
        })
    }

    componentWillMount() {
        TeamStore.on("FETCH_TEAM", this.setLoadingStatus);
        TeamStore.on("RECEIVE_TEAM", this.setTeam);

        ActionsCreator.getTeam(this.props.params.team_id);
    }

    componentWillUnmount() {
        TeamStore.removeListener("FETCH_TEAM", this.setLoadingStatus);
        TeamStore.removeListener("RECEIVE_TEAM", this.setTeam);
    }

    render() {
        if(!this.state.loading) {

        } else {
            return(<Spinner />)
        }
    }
}
