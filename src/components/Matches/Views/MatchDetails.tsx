import * as React from "react";
import { Link } from 'react-router';

import Spinner from "../../Elements/Spinner";
import CustomTable from "../../CustomTable/CustomTable"
import CustomRow from "../../CustomTable/CustomRow"
import FlatButton from 'material-ui/FlatButton';

import ActionStore from "../Stores/ActionStore"
import {TeamActions, Action} from "../Models"
import * as ActionsCreator from "../ActionsCreator"

import ActionMap from "../../../components/Map/ActionMap/Index"

export interface ILayoutProps {
    params: {
        teamID: number
        matchID: number
    }
}

export interface ILayoutState {
    loading?: boolean,
    team_actions?: TeamActions,
    actions?: Action[]
}

export default class MatchDetails extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props)

        this.state = {
            team_actions: new TeamActions()
        }

        this.getActions = this.getActions.bind(this)
        this.setLoadingStatus = this.setLoadingStatus.bind(this)
        this.setTeamActions = this.setTeamActions.bind(this)
    }

    getActions() {
        return [].concat.apply([], this.state.team_actions.players.map((player) => {
            return player.actions
        }))
    }

    setLoadingStatus() {
        this.setState({
            loading: ActionStore.fetching
        })
    }

    setTeamActions() {
        this.setState({
            team_actions: ActionStore.team_actions
        }, () => {
            this.setState({
                loading: ActionStore.fetching,
                actions: this.getActions()
            })
        })
    }

    componentWillMount() {
        ActionStore.on("FETCH_MATCH_ACTIONS", this.setLoadingStatus);
        ActionStore.on("RECEIVE_MATCH_ACTIONS", this.setTeamActions);
        ActionsCreator.getTeamActionsByMatch(this.props.params.teamID, this.props.params.matchID);
    }

    componentWillUnmount() {
        ActionStore.removeListener("FETCH_MATCH_ACTIONS", this.setLoadingStatus)
        ActionStore.removeListener("RECEIVE_MATCH_ACTIONS", this.setTeamActions)
    }

    componentDidMount() {

    }

    render() {
        if(!this.state.loading){
            let actions = {actions: this.state.actions}
            return(<ActionMap params={actions}></ActionMap>)
        } else {
            return(<Spinner />)
        }
    }
}
