import * as React from "react";
import * as Models from "../Models"

import Li from '../../../Elements/Li';
import Toggle from 'material-ui/Toggle';

import {Action} from "../../../Matches/Models"
import ActionStore from "../../../Matches/Stores/ActionStore"

import * as ActionsCreator from "../ActionsCreator"
import {ActionImpact} from "../Models"

export interface ILayoutProps {
    params: {
        component: string
        actions: Action[]
    }
}
export interface ILayoutState {
    action_impacts?: ActionImpact[]
}

export default class ActionImpactFilter extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props)

        this.state = {
            action_impacts: this.setActionImpacts(this.props.params.actions)
        }

        this.onToggleClick = this.onToggleClick.bind(this)
        this.setActionImpacts = this.setActionImpacts.bind(this)
    }

    onToggleClick(e: any){
        let action_impact = new ActionImpact(e.currentTarget.value, e.currentTarget.checked)
        this.filterActionImpacts(action_impact)
        ActionsCreator.filterActionsByImpact(this.props.params.component, this.state.action_impacts)
    }

    setActionImpacts(actions: Action[]) {
        return actions.reduce((acc, action) => {
            if(acc.indexOf(action.description) == -1) {
                acc.push(action.description)
            }
            return acc;
        }, new Array<string>()).map((impact: string) => (new ActionImpact(impact, true)));
    }

    filterActionImpacts(action_impact: ActionImpact){
        let index = this.state.action_impacts.map((impact) => {
            return impact.name
        }).indexOf(action_impact.name)

        if(index != -1) {
            this.state.action_impacts[index].used = action_impact.used
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        const ActionImpacts = this.state.action_impacts.map((action_impact) => {
            return(<Li><Toggle value={action_impact.name} toggled={action_impact.used} onToggle={this.onToggleClick.bind(this)} label={action_impact.name} /></Li>)
        })

        return(
            <div>
                <h3>Type d'action</h3>
                <ul>{ActionImpacts}</ul>
            </div>
        );
    }
}
