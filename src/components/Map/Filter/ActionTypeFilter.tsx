import * as React from "react";
import FilterStore from "./Store"
import * as Models from "./Models"
import * as ActionsCreator from "./ActionsCreator"

import Li from '../../Elements/Li';

import Toggle from 'material-ui/Toggle';


export interface ILayoutProps {}
export interface ILayoutState {
    action_types: Models.ActionType[]
}

export default class ActionMapFilter extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props)
        this.state = {
            action_types: new Array<Models.ActionType>(),
        }
        this.onActionTypeFilterClick.bind(this)
        this.setActionsFilter.bind(this)
    }

    onActionTypeFilterClick(e: any){
        ActionsCreator.filterActionsByType(new Models.ActionType(e.currentTarget.value, e.currentTarget.checked))
    }

    setActionsFilter(){
        this.setState({
            action_types: FilterStore.action_types,
        })
    }

    componentWillMount() {
        FilterStore.on("FILTER_ACTIONS_BY_TYPE", this.setActionsFilter.bind(this))
    }

    componentDidMount() {
        this.setActionsFilter()
    }

    componentWillUnmount() {
        FilterStore.removeListener("FILTER_ACTIONS_BY_TYPE", this.setActionsFilter.bind(this))
    }

    render() {
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
            <div>
                <h3>Type d'action</h3>
                <ul>{ActionTypes}</ul>
            </div>
        );
    }
}
