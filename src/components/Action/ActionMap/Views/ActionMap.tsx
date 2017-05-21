import * as React from "react";
import {Layer, Stage} from 'react-konva';
import LeftDiv from "../../../Elements/LeftDiv";
import RightDiv from "../../../Elements/RightDiv";
import SmallContainer from "../../../Elements/SmallContainer";
import FieldMap from "../../../Map"
import {ActionComponent} from "./Action"
import {IActionSummary} from "../../../../models/DatabaseModelsSummaries"
import {Filter, FilterNode, RGBColor, Size} from "../../../../models/ComponentModels"
import {ActionImpact, ActionType} from "../../../../models/ComponentModels";
import ActionStore from "../../../../components/Action/Store";
import {Toggle} from "material-ui";
import Spinner from "../../../Elements/Spinner";

export interface ILayoutProps {
    matchID: number
}

export interface ILayoutState {
    size?: Size,
    action_impacts?: {[action_impact: string] : RGBColor},
    filters?: {[name: string]  : Filter},
    actions?: IActionSummary[]
}

export class ActionMapComponent
    extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: ILayoutProps) {
        super(props);

        this.state = {
            size: new Size(1200, 600),
            action_impacts: {},
            filters: {},
            actions: ActionStore.getActionsForMatch(this.props.matchID)
        };

        /*this.createActionTypeFilter = this.createActionTypeFilter.bind(this);
        this.createActionImpactFilter = this.createActionImpactFilter.bind(this);*/

        this.setActions = this.setActions.bind(this);
        this.getFilters = this.getFilters.bind(this);
        this.getActionImpacts = this.getActionImpacts.bind(this);
    }

    setActions() {
        let actions: IActionSummary[] = ActionStore.getActionsForMatch(this.props.matchID);
        let filters: {[name: string]  : Filter} = this.getFilters(actions);
        let action_impacts:{[action_impact: string] : RGBColor} = this.getActionImpacts(filters["ACTION_IMPACT"]);

        this.setState({
            actions: actions,
            filters: filters,
            action_impacts: action_impacts
        })
    }

    componentWillMount() {
        ActionStore.on("RECEIVE_MATCH_ACTIONS", this.setActions);
    }

    componentWillUnmount() {
        ActionStore.removeListener("RECEIVE_MATCH_ACTIONS", this.setActions);
    }

    /*refs: {
        [string: string]: (Element);
        mainStage: (HTMLElement);
    };

    componentDidMount() {
        let w = this.refs.mainStage.clientWidth;
        let h = w / 2;

        this.setState({
            size: new Size(w, h)
        });
    }*/

    getActionImpacts(filter: Filter) {
        let action_impacts: {[action_impacts: string] : RGBColor} = {};

        for(let node of filter.nodes) {
            if(!(node.value in action_impacts)) {
                action_impacts[node.value] = node.color;
            }
        }

        return action_impacts;
    }

    getFilters(actions: IActionSummary[]) {
        let impact_nodes: Array<FilterNode> = [];

        for(let action of actions) {
            let nodes_values: string[] = impact_nodes.map((node) => {return node.value});

            if(nodes_values.indexOf(action.impact.toString()) === -1) {
                let node = new ActionImpact(action.impact).toFilterNode();
                impact_nodes.push(node);
            }
        }

        let impact_filter = new Filter("ACTION_IMPACT", impact_nodes);

        let type_nodes: Array<FilterNode> = [];

        for(let action of actions) {
            let nodes_values: string[] = type_nodes.map((node) => {return node.value});

            if(nodes_values.indexOf(action.type.id.toString()) === -1) {
                let node = new ActionType(action.type.id, action.type.description).toFilterNode();
                type_nodes.push(node);
            }
        }

        let type_filter = new Filter("ACTION_TYPE", type_nodes);

        let filters: {[name: string]  : Filter} = {};
        filters["ACTION_IMPACT"] = impact_filter;
        filters["ACTION_TYPE"] = type_filter;

        return filters
    }

    getFilteredActions() {
        let action_types = this.state.filters["ACTION_TYPE"].nodes.filter(node => node.used == true).map((node) => {
            return node.value;
        });

        let action_impacts = this.state.filters["ACTION_IMPACT"].nodes.filter(node => node.used == true).map((node) => {
            return node.value
        });

        return this.state.actions.filter(action => action_impacts.indexOf(action.impact.toString()) !== -1)
                                 .filter(action => action_types.indexOf(action.type.id.toString()) !== -1);
    }

    onActionTypeToggle(e: React.FormEvent<HTMLInputElement>) {
        let filter = this.state.filters["ACTION_TYPE"];

        this.setState({

        })
    }

    onActionImpactToggle(e: React.FormEvent<HTMLInputElement>) {

    }

    render() {
        if (this.state.actions.length === 0) {
            return(
                <SmallContainer>
                    <Spinner/>
                </SmallContainer>
            )
        }

        let actions = this.getFilteredActions().map((action) => {
            let color: RGBColor = this.state.action_impacts[action.impact.toString()];
            return <ActionComponent params={{action: action, color: color, parent_size: this.state.size}}/>
        });

        let action_impact_filter = this.state.filters["ACTION_IMPACT"].nodes.map((node) => {
            let style = {color: node.color.toString()};
            return <li><Toggle labelStyle={style} onToggle={this.onActionImpactToggle.bind(this)} checked={node.used} value={node.value} label={node.label}/></li>;
        });

        let action_type_filter = this.state.filters["ACTION_TYPE"].nodes.map((node) => {
            let style = {color: node.color};
            return <li><Toggle labelStyle={style} onToggle={this.onActionTypeToggle.bind(this)} checked={node.used} value={node.value} label={node.label}/></li>;
        });

        return (
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
                    <h3>Impact de l'action</h3>
                    <ul>{action_impact_filter}</ul>
                    <h3>Type d'action</h3>
                    <ul>{action_type_filter}</ul>
                </RightDiv>
            </SmallContainer>
        );
    }
}
