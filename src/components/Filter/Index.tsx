import * as React from "react";
import Toggle from 'material-ui/Toggle';
import {Filter, FilterNode} from "../../Models/ComponentModels";
import Li from "../Elements/Li";
import * as FilterActionsCreator from "./ActionsCreator"

export interface ILayoutProps {
    filter: Filter
}

export interface ILayoutState {

}

export default class FilterComponent extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);
    }

    onNodeToggle(event: React.FormEvent<HTMLInputElement>){
        let nodes = this.props.filter.nodes.map((node: FilterNode) => {
            if(event.currentTarget.value = node.value) {
                node.used = event.currentTarget.checked;
            }

            return node
        });

        let filter = new Filter(this.props.filter.name, this.props.filter.component, this.props.filter.colored, nodes);
        FilterActionsCreator.handleFilter(filter);
    }

    render() {
        let nodes = this.props.filter.nodes.map((node: FilterNode) => {
            let style = {};

            if(node.color != null) {
                style = {color: node.color.toString()};
            }

            return(
                <Li style={style}>
                    <Toggle label={node.label} labelStyle={style} value={node.value} checked={node.used} onToggle={this.onNodeToggle.bind(this)} />
                </Li>
            )
        });

        return(<ul>{nodes}</ul>);
    }
}