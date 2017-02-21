import * as React from "react";
import Store from "../Store"
import ActionType from "./models/ActionType"
import * as ActionsCreator from "../ActionsCreator"

import Toggle from 'material-ui/Toggle';

require('../../../../sass/ArrowMap.scss');

export interface ILayoutProps {}
export interface ILayoutState {
    action_types: ActionType[]
}

export default class ActionMapFilter extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props)
        this.state = {
            action_types: new Array<ActionType>()
        }
        this.onCheckboxClick.bind(this)
        this.setActionTypes.bind(this)
    }

    onCheckboxClick(e: any){
        ActionsCreator.filterActions(new ActionType(e.currentTarget.value, e.currentTarget.checked))
    }

    setActionTypes(){
        this.setState({
            action_types: Store.getActionTypes()
        })
    }

    componentWillMount() {
        Store.on("FILTER_ACTIONS", this.setActionTypes.bind(this))
    }

    componentDidMount() {
        this.setActionTypes()
    }

    componentWillUnmount() {
        Store.removeListener("FILTER_ACTIONS", this.setActionTypes.bind(this))
    }

    render() {
        const ActionTypes = this.state.action_types.map((action_type, i) => {
            const style = {
                color: 'rgb(' + action_type.getColor().r + ", " + action_type.getColor().g + ", " + action_type.getColor().b + ")"
            }

            return (
                <li style={style}key={i}>
                    <Toggle labelStyle={style} value={action_type.getType()} toggled={action_type.isUsed()} onToggle={this.onCheckboxClick} label={action_type.getType()} />
                </li>
            )
        })

        return(
            <div id="ArrowMapFilter" className="right">
                <h3>Types d'Actions</h3>
                <ul>{ActionTypes}</ul>
            </div>
        );
    }
}
