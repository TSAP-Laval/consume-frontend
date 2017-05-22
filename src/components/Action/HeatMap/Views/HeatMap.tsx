import * as React from "react";
import {Layer, Stage} from 'react-konva';
import LeftDiv from "../../../Elements/LeftDiv";
import RightDiv from "../../../Elements/RightDiv";
import SmallContainer from "../../../Elements/SmallContainer";
import FieldMap from "../../../Map"
import {ZoneComponent} from "./Zone"
import {ZoneRatioComponent} from "./ZoneRatio"
import {IActionSummary} from "../../../../Models/DatabaseModelsSummaries"
import ActionStore from "../../../../components/Action/Store";
import {ActionImpact, ActionType, Size, Zone, ZoneData} from "../../../../models/ComponentModels";
import {DropDownMenu, MenuItem, Toggle} from "material-ui";
import Spinner from "../../../Elements/Spinner";
import * as ActionsCreator from "../../../../components/Action/ActionsCreator"
import injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


export interface ILayoutProps {
    match_id: number,
    team_id: number
}

export interface ILayoutState {
    size?: Size,
    zones_size?: Size,
    actions?: IActionSummary[],
    action_types?: ActionType[],
    action_impacts?: ActionImpact[]
}

export class HeatMapComponent
    extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: ILayoutProps) {
        super(props);

        this.state = {
            size: new Size(1200, 600),
            actions: ActionStore.getActionsForMatch(this.props.match_id),
            action_types: [],
            action_impacts: [],
            zones_size: new Size(0,0)
        };

        this.setActions = this.setActions.bind(this);
        this.setMapSize = this.setMapSize.bind(this);
        this.getActionImpacts = this.getActionImpacts.bind(this);
        this.getActionTypes = this.getActionTypes.bind(this);
        this.handleHeightChange = this.handleHeightChange .bind(this);
        this.handleWidthChange = this.handleWidthChange.bind(this);
    }
    setActions() {
        let actions: IActionSummary[] = ActionStore.getActionsForMatch(this.props.match_id);

        this.setState({
            actions: actions,
            action_types: this.getActionTypes(actions),
            action_impacts: this.getActionImpacts(actions)
        })
    }

    setMapSize() {
        this.setState({
            zones_size: ActionStore.getMapSize()
        })
    }

    componentWillMount() {
        ActionStore.on("RECEIVE_MATCH_ACTIONS", this.setActions);
        ActionStore.on("RECEIVE_MAP_SIZE", this.setMapSize);
    }

    componentWillUnmount() {
        ActionStore.removeListener("RECEIVE_MATCH_ACTIONS", this.setActions);
        ActionStore.removeListener("RECEIVE_MAP_SIZE", this.setMapSize);
    }


    getActionImpacts(actions: IActionSummary[]) {
        let action_impacts: Array<ActionImpact> = [];

        for(let action of actions) {
            if(action_impacts.map((impact) => impact.id).indexOf(action.impact) === -1) {
                action_impacts.push(new ActionImpact(action.impact));
            }
        }

        return action_impacts;
    }

    getActionTypes(actions: IActionSummary[]) {
        let action_types: Array<ActionType> = [];

        for(let action of actions) {
            if(action_types.map((action_type) => action_type.id).indexOf(action.type.id) === -1) {
                action_types.push(new ActionType(action.type.id, action.type.description));
            }
        }

        return action_types
    }

    getFilteredActions() {
        let usedImpacts = this.state.action_impacts.filter((i) => i.used).map(i => i.id);

        let usedTypes = this.state.action_types.filter((t) => t.used).map(t => t.id);

        return this.state.actions.filter(action =>
            usedImpacts.indexOf(action.impact) !== -1 && usedTypes.indexOf(action.type.id) !== -1
        );

    }

    onActionTypeToggle(e: React.FormEvent<HTMLInputElement>) {

        let value: number = parseInt(e.currentTarget.value);

        let currentDisplayState = this.state.action_types;

        let newState = currentDisplayState.map((actType) => {
            if (actType.id === value) {
                actType.used = (e.target as any).checked;
            }
            return actType;
        });

        this.setState({
            action_types: newState
        });
    }

    onActionImpactToggle(e: React.FormEvent<HTMLInputElement>) {
        let value = parseInt(e.currentTarget.value);

        let currentDisplayState = this.state.action_impacts;

        let newState = currentDisplayState.map(actImpact => {
            if (actImpact.id === value) {
                actImpact.used = (e.target as any).checked;
            }
            return actImpact
        });

        this.setState({
            action_impacts: newState
        });
    }



    getZones() {
        let zonesData = [];
        for (let action of this.getFilteredActions()) {
            let x = Math.floor(action.start_x * this.state.zones_size.width);
            let y = Math.floor(action.start_y * this.state.zones_size.height);
            zonesData.push(new ZoneData(x,y, action.impact));
        }
        let zones = [];

        for (let x = 0; x < this.state.zones_size.width; x++) {
            for (let y = 0; y < this.state.zones_size.height; y++) {
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

            zone.percentage = + (nbActions / zonesData.length);
            zone.rating = + (rating / nbActions - nbNeutres);
        }
        return zones;
    }
    handleHeightChange(e: __MaterialUI.TouchTapEvent, index: number, menuItemValue: any) {
        let new_size: Size = new Size(this.state.zones_size.width, menuItemValue);
        this.setState({
            zones_size: new_size
        });
        ActionsCreator.SetMapSize(this.props.team_id, new_size);
    }
    handleWidthChange(e: __MaterialUI.TouchTapEvent, index: number, menuItemValue: any) {
        let new_size: Size = new Size(menuItemValue,this.state.zones_size.height);
        this.setState({
            zones_size: new_size
        });
        ActionsCreator.SetMapSize(this.props.team_id, new_size);
    }

    render() {
        if (this.state.actions.length === 0) {
            return(
                <SmallContainer>
                    <Spinner/>
                </SmallContainer>
            )
        }
        let widthChoices = [2,3,4,5,6,7,8,9,10,11,12];
        let heightChoices = [1,2,3,4,5,6,7,8];
        let rawZones = this.getZones();
        let zones = rawZones.map((zone, i) => {
            return <ZoneComponent key={i} zone={zone} zone_size={this.state.zones_size} parent_size={this.state.size}/>
        });
        let ratios = rawZones.map((zone, i) => {
            return <ZoneRatioComponent key={i} zone={zone} zone_size={this.state.zones_size} parent_size={this.state.size}/>
        });
        const styles = {
            customWidth: {
                width: 200,
            },
        };
        const textWidth = this.state.zones_size.width;
        const widthDropDown = widthChoices.map((val) => {
            return (
                <MenuItem key={val} value={val} primaryText={val + " Zones"} />
            )
        });

        const textHeight = this.state.zones_size.height;
        const heightDropDown = heightChoices.map((val) => {
            return (
                <MenuItem key={val} value={val} primaryText={val + " Zones"} />
            )
        });
        let action_impact_filter = this.state.action_impacts.map((action_impact) => {
            let style = {color: action_impact.getColor().toString()};
            return <li key={action_impact.id}><Toggle labelStyle={style} onToggle={this.onActionImpactToggle.bind(this)} defaultToggled={action_impact.used} value={action_impact.id} label={action_impact.name}/></li>;
        });

        let action_type_filter = this.state.action_types.map((action_type) => {
            return <li key={action_type.id}><Toggle onToggle={this.onActionTypeToggle.bind(this)} defaultToggled={action_type.used} value={action_type.id} label={action_type.name}/></li>;
        });

        return(
            <SmallContainer>
                <LeftDiv>
                    <div ref="mainStage">
                        <Stage width={this.state.size.width} height={this.state.size.height}>
                            <Layer>{zones}</Layer>
                            <Layer>{ratios}</Layer>
                            <FieldMap height={this.state.size.height}/>
                        </Stage>
                    </div>
                </LeftDiv>
                <RightDiv>
                    <h3>Impact de l'action</h3>
                    <ul>{action_impact_filter}</ul>
                    <h3>Type d'action</h3>
                    <ul>{action_type_filter}</ul>
                    <h3>Hauteur</h3>
                    <DropDownMenu value={textHeight} onChange={this.handleHeightChange} style={styles.customWidth} autoWidth={false}>{heightDropDown}</DropDownMenu>
                    <h3>Longeur</h3>
                    <DropDownMenu value={textWidth} onChange={this.handleWidthChange} style={styles.customWidth} autoWidth={false}>{widthDropDown}</DropDownMenu>
                </RightDiv>
            </SmallContainer>
        );
    }
}
