import * as React from "react";
import FilterStore from "./Store"
import * as Models from "./Models"
import * as ActionsCreator from "./ActionsCreator"

import Li from '../../Elements/Li';

import Toggle from 'material-ui/Toggle';


export interface ILayoutProps {}
export interface ILayoutState {
    action_impacts: Models.ActionImpact[]
}

export default class ActionMapFilter extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props)
        this.state = {
            action_impacts: new Array<Models.ActionImpact>()
        }
        this.onActionImpactFilterClick.bind(this)
        this.setActionsFilter.bind(this)
    }

    onActionImpactFilterClick(e: any){
        ActionsCreator.filterActionsByImpact(new Models.ActionImpact(e.currentTarget.value, e.currentTarget.checked))
    }

    setActionsFilter(){
        this.setState({
            action_impacts: FilterStore.action_impacts
        })
    }

    componentWillMount() {
        FilterStore.on("FILTER_ACTIONS_BY_IMPACT", this.setActionsFilter.bind(this))
    }

    componentDidMount() {
        this.setActionsFilter()
    }

    componentWillUnmount() {
        FilterStore.removeListener("FILTER_ACTIONS_BY_IMPACT", this.setActionsFilter.bind(this))
    }

    render() {
        const ActionImpacts = this.state.action_impacts.map((action_impact) => {
            return (
                <Li><Toggle value={action_impact.name} toggled={action_impact.used} onToggle={this.onActionImpactFilterClick.bind(this)} label={action_impact.name} /></Li>
            )
        })

        return(
            <div>
                <h3>Impact de l'action</h3>
                <ul>{ActionImpacts}</ul>
            </div>
        );
    }
}
