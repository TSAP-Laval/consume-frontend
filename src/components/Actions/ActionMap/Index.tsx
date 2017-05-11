import * as React from "react";
import {Layer, Stage} from 'react-konva';
import LeftDiv from "../../Elements/LeftDiv";
import RightDiv from "../../Elements/RightDiv";
import SmallContainer from "../../Elements/SmallContainer";
import FieldMap from "../../../components/Map/Index"
import {ActionComponent} from "../Index"
import {IActionSummary} from "../../../Models/DatabaseModelsSummaries"
import {Filter, FilterNode, IComponent, RGBColor, Size} from "../../../Models/ComponentModels"
import * as FilterActionsCreator from "../../Filter/ActionsCreator"
import FilterStore from "../../Filter/Store"
import FilterComponent from "../../Filter/Index"
import {ActionImpact, ActionType} from "../../../Models/DatabaseModels";

export interface ILayoutProps {
    actions: IActionSummary[]
}

export interface ILayoutState {
    size?: Size
    filters?: {[name: string]  : Filter};
}

export class ActionMap
    extends React.Component<ILayoutProps, ILayoutState>
    implements IComponent{

    readonly component_name: string = "ActionMap";
    action_impacts: {[action_impact: string] : RGBColor};

    refs: {
        [string: string]: (Element);
        mainStage: (HTMLElement);
    };

    constructor(props: ILayoutProps) {
        super(props);

        this.createActionTypeFilter = this.createActionTypeFilter.bind(this);
        this.createActionImpactFilter = this.createActionImpactFilter.bind(this);
    }

    componentWillMount() {
        FilterStore.on("HANDLE_FILTER", this.handleFiltering);

        let width = this.refs.mainStage.clientWidth;
        let height = width / 2;

        this.setState({
            size: new Size(width, height)
        });

        this.createActionTypeFilter();
        this.createActionImpactFilter();
    }

    createActionImpactFilter() {
        let nodes: Array<FilterNode> = new Array<FilterNode>();

        for(let action of this.props.actions) {
            let nodes_values: string[] = nodes.map((node) => {return node.value});

            if(nodes_values.indexOf(action.impact.toString()) === -1) {
                let node = new ActionImpact(action.impact).toFilterNode();
                this.action_impacts[node.value] = node.color;
                nodes.push(node);
            }
        }

        let filter = new Filter("ACTION_IMPACT", this.component_name, nodes);
        FilterActionsCreator.handleFilter(filter);
    }

    createActionTypeFilter() {
        let nodes: Array<FilterNode> = new Array<FilterNode>();

        for(let action of this.props.actions) {
            let nodes_values: string[] = nodes.map((node) => {return node.value});

            if(nodes_values.indexOf(action.type.id.toString()) === -1) {
                let node = new ActionType(action.type.id, action.type.description).toFilterNode();
                nodes.push(node);
            }
        }

        let filter = new Filter("ACTION_TYPE", this.component_name, nodes);
        FilterActionsCreator.handleFilter(filter);
    }

    getFilterComponents() {
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
        let actions: Array<IActionSummary[]> = [];

        let action_types = this.state.filters["ACTION_TYPE"].nodes.filter(node => node.used == true).map((node) => {
            return node.value;
        });

        actions.push(this.props.actions.filter(action => action_types.indexOf(action.type.id.toString()) !== -1));

        let action_impacts = this.state.filters["ACTION_IMPACT"].nodes.filter(node => node.used == true).map((node) => {
            return node.value
        });

        actions.push(this.props.actions.filter(action => action_impacts.indexOf(action.impact.toString()) !== -1));

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
            filters: FilterStore.getFiltersByComponent(this.component_name)
        });
    }

    render() {
            let actions = this.getFilteredActions().map((action) => {
                let color: RGBColor = this.action_impacts[action.impact.toString()];
                return <ActionComponent action={action} color={color} parent_size={this.state.size}/>
            });

            let filters = this.getFilterComponents();

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
                    <RightDiv>{filters}</RightDiv>
                </SmallContainer>
            );
    }
}
