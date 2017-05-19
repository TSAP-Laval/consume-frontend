import * as React from "react";
import Spinner from "../../Elements/Spinner";
import {ITeam} from "../../../models/DatabaseModels";
import TeamStore from "../Store";
import * as ActionsCreator from "../ActionsCreator"
import MatchList from "./MatchList";
import BigContent from "../../Elements/BigContent";
import PlayerList from "../../Player/PlayerList/Index";

export interface ILayoutProps {
    params: {
        team_id: number
    }
}

export interface ILayoutState {
    loading?: boolean,
    team?: ITeam
}

export default class TeamView extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);

        this.setState({
           loading: true
        });

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
        });
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
            //let matches_params = {team_id: this.state.team.id, matches: this.state.team.matches};
            //return(<BigContent><MatchList params={matches_params}/></BigContent>)

            let players_params = {team_id: this.state.team.id, team_name: this.state.team.name, players: this.state.team.players, metrics: this.state.team.metrics};
            return(<BigContent><PlayerList params={players_params}/></BigContent>)
        } else {
            return(<Spinner />)
        }
    }
}
