import * as React from "react";
import {Layer, Stage} from 'react-konva';
import LeftDiv from "../../../Elements/LeftDiv";
import RightDiv from "../../../Elements/RightDiv";
import SmallContainer from "../../../Elements/SmallContainer";
import FieldMap from "../../../Map/Index"
import {ZoneComponent} from "./Zone"
import {IActionSummary} from "../../../../Models/DatabaseModelsSummaries"
import {Filter, FilterNode, IComponent, RGBColor, Size, Zone, ZoneData} from "../../../../Models/ComponentModels"
import * as FilterActionsCreator from "../../../Filter/ActionsCreator"
import FilterStore from "../../../Filter/Store"
import FilterComponent from "../../../Filter/Index"
import {ActionImpact, ActionType} from "../../../../Models/ComponentModels";

export interface ILayoutProps {
    actions: IActionSummary[]
}

export interface ILayoutState {
    zones_size?: Size
    size?: Size
    filters?: {[name: string]  : Filter};
}

export class HeatMap
    extends React.Component<ILayoutProps, ILayoutState>
    implements IComponent{

    readonly component_name: string = "HeatMap";
    action_impacts: {[action_impact: string] : RGBColor};
    mapParameters: Size;

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
            size: new Size(width, height),
            zones_size: new Size(4,3)
        });

        this.createActionTypeFilter();
        this.createActionImpactFilter();
    }

    createActionImpactFilter() {
        let nodes: Array<FilterNode> = [];

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
        let nodes: Array<FilterNode> = [];

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
        let action_types = this.state.filters["ACTION_TYPE"].nodes.filter(node => node.used == true).map((node) => {
            return node.value;
        });

        let action_impacts = this.state.filters["ACTION_IMPACT"].nodes.filter(node => node.used == true).map((node) => {
            return node.value
        });

        return this.props.actions.filter(action => action_impacts.indexOf(action.impact.toString()) !== -1)
                                 .filter(action => action_types.indexOf(action.type.id.toString()) !== -1);
    }

    getZones() {
        let zonesData = [];

        for (let action of this.getFilteredActions()) {
            let x = Math.floor(action.start_x * this.mapParameters.width);
            let y = Math.floor(action.start_y * this.mapParameters.height);
            zonesData.push(new ZoneData(x,y, action.impact));
        }
        let zones = [];

        for (let x = 0; x < this.mapParameters.width; x++) {
            for (let y = 0; y < this.mapParameters.height; y++) {
                zones.push(new Zone(x,y, 0, 0));
            }
        }

        for (let zone of zones){
            let nbActions = 0;
            let rating = 0;
            let nbNeutres = 0;

            for(let zoneData of zonesData){
                if (zoneData.x == zone.x && zoneData.y == zone.y){
                    nbActions++;
                    if (zoneData.impact == 1){
                        rating++;
                    } else if (zoneData.impact == 0) {
                        nbNeutres++;
                    }
                }
            }

            zone.percentage = + (nbActions / zonesData.length).toFixed(2);
            zone.rating = + (rating / nbActions - nbNeutres).toFixed(2);
        }
        return zones;
    }

    handleFiltering() {
        this.setState({
            filters: FilterStore.getFiltersByComponent(this.component_name)
        });
    }

    render() {
            let zones = this.getZones().map((zone) => {
                return <ZoneComponent zone={zone} zone_size={this.state.zones_size} parent_size={this.state.size}/>
            });

            let filters = this.getFilterComponents();

            return(
                <SmallContainer>
                    <LeftDiv>
                        <div ref="mainStage">
                            <Stage width={this.state.size.width} height={this.state.size.height}>
                                <FieldMap height={this.state.size.height}/>
                                <Layer>{zones}</Layer>
                            </Stage>
                        </div>
                    </LeftDiv>
                    <RightDiv>{filters}</RightDiv>
                </SmallContainer>
            );
    }
}
