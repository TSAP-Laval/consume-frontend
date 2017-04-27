import * as React from "react";
import * as Models from "./Models"
import {Action} from "../../Matches/Models"

import Li from '../../Elements/Li';

import Toggle from 'material-ui/Toggle';


export interface ILayoutProps {
    params: {
        actions: Action[]
    }
}
export interface ILayoutState {
    action_impacts: Models.ActionImpact[]
    filter: Models.ActionImpactFilter
}

export default class ActionImpactFilter extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props)

        this.state = {
            action_impacts: new Array<Models.ActionImpact>(),
            filter: new Models.ActionImpactFilter(this.props.params.actions)
        }

        this.onToggleClick.bind(this)
    }

    onToggleClick(e: any){
        let action_impact = new Models.ActionImpact(e.currentTarget.value, e.currentTarget.checked)
        this.state.action_impacts = this.state.filter.updateActionImpacts(action_impact)
    }

    componentWillMount() {
        this.state.action_impacts = this.state.filter.action_impacts
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
