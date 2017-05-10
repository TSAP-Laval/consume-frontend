import * as React from "react";
import {Layer, Stage} from 'react-konva';
import LeftDiv from "../../Elements/LeftDiv";
import RightDiv from "../../Elements/RightDiv";
import SmallContainer from "../../Elements/SmallContainer";
import FieldMap from "../../../components/Map/Index"
import {ActionComponent} from "../Index"
import {Action} from "../../../Models/DatabaseModels"
import {Filter, FilterNode, IComponent, Size} from "../../../Models/ComponentModels"
import * as FilterActionsCreator from "../../Filter/ActionsCreator"
import FilterStore from "../../Filter/Store"
import FilterComponent from "../../Filter/Index"

export interface ILayoutProps {
    actions: Action[]
}

export interface ILayoutState {
    size?: Size
    filters?: {[name: string]  : Filter};
    actions?: Action[];
}

export class ActionMap
    extends React.Component<ILayoutProps, ILayoutState>
    implements IComponent{

    readonly component_name: string = "ActionMap";

    refs: {
        [string: string]: (Element);
        mainStage: (HTMLElement);
    };

    constructor(props: ILayoutProps) {
        super(props);

        this.setState({
           actions: props.actions.slice(0)
        });

        this.createActionTypeFilter = this.createActionTypeFilter.bind(this);
    }

    getFilters() {
        let filters = [];

        for(let key in this.state.filters) {
            if(this.state.filters.hasOwnProperty(key)) {
                let filter = this.state.filters[key];
                filters.push(
                    <FilterComponent filter={filter}/>
                );
            }
        }

        return filters;
    }

    getFilteredActions() {
        let actions:Array<Action[]> = [];

        let action_types = this.state.filters["ACTION_TYPE"].nodes.filter(node => node.used == true);
        actions.push(this.state.actions.filter(action => action_types.indexOf(action.type.toFilterNode()) !== -1));

        actions.sort((a, b) => {
            return a.length - b.length;
        });

        return actions.shift().filter((x) => {
            return actions.every((y) => {
                return y.indexOf(x) !== -1;
            })
        });
    }

    handleFiltering() {
        this.setState({
            filters: FilterStore.getFiltersByComponent("ActionMap")
        });
    }

    createActionTypeFilter() {
        let nodes = this.props.actions.reduce((acc, action) => {
            let node = action.type.toFilterNode();

            if(acc.indexOf(node) == -1) {
                acc.push(node);
            }

            return acc;
        }, new Array<FilterNode>());

        let filter = new Filter("ACTION_TYPE", "ActionMap", true, nodes);
        FilterActionsCreator.handleFilter(filter);
    }

    componentWillMount() {
        FilterStore.on("HANDLE_FILTER", this.handleFiltering);
    }

    componentDidMount() {
        let width = this.refs.mainStage.clientWidth;
        let height = width / 2;

        this.setState({
            size: new Size(width, height)
        });

        this.createActionTypeFilter();
    }

    render() {
            let actions = this.getFilteredActions().map((action) => {
                return <ActionComponent action={action} parent_size={this.state.size}/>
            });

            let filters = this.getFilters();

            return(
                <SmallContainer>
                    <LeftDiv>
                        <div ref="mainStage">
                            <Stage width={this.state.size.width} height={this.state.size.height}>
                                <FieldMap height={this.state.size.height}/>
                                <Layer>{actions}</Layer>
                            </Stage>
                        </div>
                    </LeftDiv>
                    <RightDiv>
                        <ul>{filters}</ul>>
                    </RightDiv>
                </SmallContainer>
            );
    }
}
