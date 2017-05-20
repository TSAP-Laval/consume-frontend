import * as React from "react";
import Spinner from "../../Elements/Spinner";
import {ITeam} from "../../../models/DatabaseModels";
import TeamStore from "../Store";
import * as ActionsCreator from "../ActionsCreator"
import MatchList from "./MatchList";
import BigContent from "../../Elements/BigContent";
import PlayerList from "../../Player/PlayerList/index";

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

        console.log("CONSTRUCTOR SETTING STATE");
        this.state = {
           loading: true
        };

        this.setLoadingStatus = this.setLoadingStatus.bind(this);
        this.setTeam = this.setTeam.bind(this);
    }

    setLoadingStatus() {
        console.log("TEAMVIEW STATE CHANGE: ", false);

        this.setState({
            loading: TeamStore.fetching
        })
    }

    setTeam() {
        console.log("TEAMVIEW STATE CHANGE: ", TeamStore.fetching);

        this.setState({
            loading: TeamStore.fetching,
            team: TeamStore.team
        });
    }

    componentWillMount() {
        TeamStore.on("FETCH_TEAM", this.setLoadingStatus);
        TeamStore.on("RECEIVE_TEAM", this.setTeam);
        console.log("COMPONENT WILL MOUNT");
    }

    componentDidMount() {
        ActionsCreator.getTeam(this.props.params.team_id);
    }

    componentWillUnmount() {
        console.log("UNMOUNT TEAMVIEW");
        TeamStore.removeListener("FETCH_TEAM", this.setLoadingStatus);
        TeamStore.removeListener("RECEIVE_TEAM", this.setTeam);
    }

    render() {
        if(!this.state.loading) {
            console.log("TEAMVIEW CHILD RENDERING");
            //return(<BigContent><MatchList team_id={this.state.team.id} matches={this.state.team.matches}/></BigContent>)
            return(<BigContent><PlayerList team_id={this.state.team.id} team_name={this.state.team.name} players={this.state.team.players} metrics={this.state.team.metrics}/></BigContent>)
        } else {
            console.log("TEAMVIEW SPINNER RENDERING");
            return(<Spinner />)
        }
    }
}
