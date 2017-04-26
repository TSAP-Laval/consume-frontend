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
    action_types: Models.ActionType[]
    filter: Models.ActionTypeFilter
}

export default class ActionTypeFilter extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props)

        this.state = {
            action_types: new Array<Models.ActionType>(),
            filter: new Models.ActionTypeFilter(this.props.params.actions)
        }
        this.onToggleClick.bind(this)
    }

    onToggleClick(e: any){
        let action_type = new Models.ActionType(e.currentTarget.value, e.currentTarget.checked)
        this.state.action_types = this.state.filter.updateActionTypes(action_type)
    }

    componentWillMount() {
        this.state.action_types = this.state.filter.action_types
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        const ActionTypes = this.state.action_types.map((action_type) => {
            const style = {
                color: 'rgb(' + action_type.color.r + ", " + action_type.color.g + ", " + action_type.color.b + ")"
            }

            return (
                <Li style={style}>
                    <Toggle labelStyle={style} value={action_type.type} toggled={action_type.used} onToggle={this.onToggleClick.bind(this)} label={action_type.type} />
                </Li>
            )
        })

        return(
            <div>
                <h3>Type d'action</h3>
                <ul>{ActionTypes}</ul>
            </div>
        );
    }
}
