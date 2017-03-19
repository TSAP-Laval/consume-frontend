import * as React from "react";
import Store from "../Store"
import ActionType from "./models/ActionType"
import ActionImpact from "./models/ActionImpact"
import * as ActionsCreator from "../ActionsCreator"

import Toggle from 'material-ui/Toggle';

require('../../../../sass/ArrowMap.scss');

export interface ILayoutProps {}
export interface ILayoutState {
    action_types: ActionType[]
    action_impacts: ActionImpact[]
}

export default class ActionMapFilter extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props)
        this.state = {
            action_types: new Array<ActionType>(),
            action_impacts: new Array<ActionImpact>()
        }
        this.onActionTypeFilterClick.bind(this)
        this.onActionImpactFilterClick.bind(this)
        this.setActionsFilter.bind(this)
    }

    onActionTypeFilterClick(e: any){
        ActionsCreator.filterActionsByType(new ActionType(e.currentTarget.value, e.currentTarget.checked))
    }

    onActionImpactFilterClick(e: any){
        ActionsCreator.filterActionsByImpact(new ActionImpact(e.currentTarget.value, e.currentTarget.checked))
    }

    setActionsFilter(){
        this.setState({
            action_types: Store.action_types,
            action_impacts: Store.action_impacts
        })
    }

    componentWillMount() {
        Store.on("FILTER_ACTIONS_BY_TYPE", this.setActionsFilter)
        Store.on("FILTER_ACTIONS_BY_IMPACT", this.setActionsFilter)
    }

    componentDidMount() {
        this.setActionsFilter()
    }

    componentWillUnmount() {
        Store.removeListener("FILTER_ACTIONS_BY_TYPE", this.setActionsFilter)
        Store.removeListener("FILTER_ACTIONS_BY_IMPACT", this.setActionsFilter)
    }

    render() {
        const ActionImpacts = this.state.action_impacts.map((action_impact) => {
            return (
                <li><Toggle value={action_impact.name} toggled={action_impact.used} onToggle={this.onActionImpactFilterClick} label={action_impact.name} /></li>
            )
        })

        const ActionTypes = this.state.action_types.map((action_type) => {
            const style = {
                color: 'rgb(' + action_type.color.r + ", " + action_type.color.g + ", " + action_type.color.b + ")"
            }

            return (
                <li style={style}>
                    <Toggle labelStyle={style} value={action_type.type} toggled={action_type.used} onToggle={this.onActionTypeFilterClick} label={action_type.type} />
                </li>
            )
        })

        return(
            <div id="ArrowMapFilter" className="right">
                <h3>Types d'Actions</h3>
                <ul>{ActionImpacts}</ul>
                <ul>{ActionTypes}</ul>
            </div>
        );
    }
}
