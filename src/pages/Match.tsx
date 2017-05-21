import * as React from "react";
import {IActionSummary} from "../models/DatabaseModelsSummaries";
import ActionStore from "../components/Action/Store"
import * as ActionsCreator from "../components/Action/ActionsCreator"
import BigContent from "../components/Elements/BigContent";
import {ActionMapComponent} from "../components/Action/ActionMap/Views/ActionMap";

export interface ILayoutProps {
    params: {
        team_id: number,
        match_id: number
    }
}

export interface ILayoutState {
    loading?: boolean
    actions?: IActionSummary[]
}

export default class MatchView extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);

        this.state = {
            loading: true,
            actions: []
        };

        this.setLoadingStatus = this.setLoadingStatus.bind(this);
        this.setActions = this.setActions.bind(this);
    }

    componentWillMount() {
        ActionStore.on("FETCH_MATCH_ACTIONS", this.setLoadingStatus);
        ActionStore.on("RECEIVE_MATCH_ACTIONS", this.setActions);
    }

    componentDidMount() {
        if(ActionStore.actionsExists(this.props.params.match_id)) {
            this.setActions();
        } else {
            ActionsCreator.FetchMatchActions(this.props.params.team_id, this.props.params.match_id)
        }
    }

    componentWillUnmount() {
        ActionStore.removeListener("FETCH_MATCH_ACTIONS", this.setLoadingStatus);
        ActionStore.removeListener("RECEIVE_MATCH_ACTIONS", this.setActions);
    }

    setLoadingStatus() {
        this.setState({
            loading: ActionStore.fetching
        })
    }

    setActions() {
        this.setState({
            loading: ActionStore.fetching,
            actions: ActionStore.actions[this.props.params.match_id]
        })
    }

    render() {
        return(
            <BigContent>
                <ActionMapComponent actions={this.state.actions}/>
            </BigContent>
        )
    }
}