import * as React from "react";
import {Layer, Stage} from 'react-konva';
import LeftDiv from "../../../Elements/LeftDiv";
import RightDiv from "../../../Elements/RightDiv";
import SmallContainer from "../../../Elements/SmallContainer";
import FieldMap from "../../../Map"
import {ActionComponent} from "./Action"
import {IActionSummary} from "../../../../models/DatabaseModelsSummaries"
import {Filter, FilterNode, IComponent, RGBColor, Size} from "../../../../models/ComponentModels"
import {ActionImpact, ActionType} from "../../../../models/ComponentModels";
import {Toggle} from "material-ui";

export interface ILayoutProps {
    actions: IActionSummary[]
}

export interface ILayoutState {
    size?: Size,
    action_impacts?: {[action_impact: string] : RGBColor},
    filters?: {[name: string]  : Filter};
}

export class ActionMapComponent
    extends React.Component<ILayoutProps, ILayoutState>
    implements IComponent {

    readonly component_name: string = "ActionMapComponent";

    constructor(props: ILayoutProps) {
        super(props);

        this.state = {
            size: new Size(1200, 600),
            action_impacts: {},
            filters: {}
        };

        this.createActionTypeFilter = this.createActionTypeFilter.bind(this);
        this.createActionImpactFilter = this.createActionImpactFilter.bind(this);
    }

    componentWillMount() {
        this.createActionTypeFilter();
        this.createActionImpactFilter();
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

    createActionImpactFilter() {
        let nodes: Array<FilterNode> = [];

        for(let action of this.props.actions) {
            let nodes_values: string[] = nodes.map((node) => {return node.value});

            if(nodes_values.indexOf(action.impact.toString()) === -1) {
                let node = new ActionImpact(action.impact).toFilterNode();
                this.state.action_impacts[node.value] = node.color;
                nodes.push(node);
            }
        }

        //console.log("ACTION IMPACT NODES");
        //console.log(nodes);

        let filter = new Filter("ACTION_IMPACT", this.component_name, nodes);
        this.state.filters[filter.name] = filter;
    }

    createActionTypeFilter() {
        let nodes: Array<FilterNode> = [];

        for(let action of this.props.actions) {
            let nodes_values: string[] = nodes.map((node) => {return node.value});

            if(nodes_values.indexOf(action.type.id.toString()) === -1) {
                let node = new ActionType(action.type.id, action.type.description).toFilterNode();
                nodes.push(node);
            }
        }

        //console.log("ACTION TYPE NODES");
        //console.log(nodes);

        let filter = new Filter("ACTION_TYPE", this.component_name, nodes);
        this.state.filters[filter.name] = filter;
    }

    getFilteredActions() {
        let action_types = this.state.filters["ACTION_TYPE"].nodes.filter(node => node.used == true).map((node) => {
            return node.value;
        });

        let action_impacts = this.state.filters["ACTION_IMPACT"].nodes.filter(node => node.used == true).map((node) => {
            return node.value
        });

        return this.props.actions.filter(action => action_impacts.indexOf(action.impact.toString()) !== -1)
                                 .filter(action => action_types.indexOf(action.type.id.toString()) !== -1);
    }

    render() {
        //console.log(this.props.actions);
        //console.log(this.state.filters);

        let actions = this.getFilteredActions().map((action) => {
            let color: RGBColor = this.state.action_impacts[action.impact.toString()];
            return <ActionComponent params={{action: action, color: color, parent_size: this.state.size}}/>
        });

        let action_type_filter = this.state.filters["ACTION_TYPE"].nodes.map((node) => {
            let style = {color: node.color};
            return <li><Toggle style={style} checked={node.used} value={node.value} label={node.label}/></li>;
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
                <RightDiv><ul>{action_type_filter}</ul>></RightDiv>
            </SmallContainer>
        );
    }
}
