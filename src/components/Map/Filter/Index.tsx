import * as React from "react";
import FilterStore from "./Store"
import * as Models from "./Models"
import * as ActionsCreator from "./ActionsCreator"

import Li from '../../Elements/Li';
import RightDiv from "../../Elements/RightDiv";

import Toggle from 'material-ui/Toggle';


export interface ILayoutProps {}
export interface ILayoutState {
    action_types: Models.ActionType[]
    action_impacts: Models.ActionImpact[]
}

export default class ActionMapFilter extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props)
        this.state = {
            action_types: new Array<Models.ActionType>(),
            action_impacts: new Array<Models.ActionImpact>()
        }
        this.onActionTypeFilterClick.bind(this)
        this.onActionImpactFilterClick.bind(this)
        this.setActionsFilter.bind(this)
    }

    onActionTypeFilterClick(e: any){
        ActionsCreator.filterActionsByType(new Models.ActionType(e.currentTarget.value, e.currentTarget.checked))
    }

    onActionImpactFilterClick(e: any){
        ActionsCreator.filterActionsByImpact(new Models.ActionImpact(e.currentTarget.value, e.currentTarget.checked))
    }

    setActionsFilter(){
        this.setState({
            action_types: FilterStore.action_types,
            action_impacts: FilterStore.action_impacts
        })
    }

    componentWillMount() {
        FilterStore.on("FILTER_ACTIONS_BY_TYPE", this.setActionsFilter.bind(this))
        FilterStore.on("FILTER_ACTIONS_BY_IMPACT", this.setActionsFilter.bind(this))
    }

    componentDidMount() {
        this.setActionsFilter()
    }

    componentWillUnmount() {
        FilterStore.removeListener("FILTER_ACTIONS_BY_TYPE", this.setActionsFilter.bind(this))
        FilterStore.removeListener("FILTER_ACTIONS_BY_IMPACT", this.setActionsFilter.bind(this))
    }

    render() {
        const ActionImpacts = this.state.action_impacts.map((action_impact) => {
            return (
                <Li><Toggle value={action_impact.name} toggled={action_impact.used} onToggle={this.onActionImpactFilterClick.bind(this)} label={action_impact.name} /></Li>
            )
        })

        const ActionTypes = this.state.action_types.map((action_type) => {
            const style = {
                color: 'rgb(' + action_type.color.r + ", " + action_type.color.g + ", " + action_type.color.b + ")"
            }

            return (
                <Li style={style}>
                    <Toggle labelStyle={style} value={action_type.type} toggled={action_type.used} onToggle={this.onActionTypeFilterClick.bind(this)} label={action_type.type} />
                </Li>
            )
        })

        return(
            <RightDiv>
                <h3>Impact de l'action</h3>
                <ul>{ActionImpacts}</ul>
                <h3>Type d'action</h3>
                <ul>{ActionTypes}</ul>
            </RightDiv>
        );
    }
}
