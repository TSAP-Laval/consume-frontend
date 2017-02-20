import * as React from "react";
import Store from "../Store"
import ActionType from "./models/ActionType"
import * as ActionsCreator from "../ActionsCreator"

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

    onCheckboxClick(e: React.FormEvent<HTMLInputElement>){
        ActionsCreator.filterActions(new ActionType(e.currentTarget.value, e.currentTarget.checked))
    }

    setActionTypes(){
        this.setState({
            action_types: Store.getActionTypes()
        })
    }

    componentWillMount() {
        Store.on("FILTER_ACTIONS", this.setActionTypes)
    }

    componentDidMount() {
        this.setActionTypes()
    }
    
    componentWillUnmount() {
        Store.removeListener("FILTER_ACTIONS", this.setActionTypes)
    }

    render() {
        const ActionTypes = this.state.action_types.map((action_type, i) => {
            return <li key={i}><input type="checkbox" value={action_type.getType()} checked={action_type.isUsed()} onClick={this.onCheckboxClick}/>{action_type.getType()}</li>
        })

        return(
            <div id="ArrowMapFilter">
                <ul>{ActionTypes}</ul>
            </div>
        );
    }
}