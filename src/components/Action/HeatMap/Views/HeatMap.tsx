import * as React from "react";
import {Layer, Stage} from 'react-konva';
import LeftDiv from "../../../Elements/LeftDiv";
import RightDiv from "../../../Elements/RightDiv";
import SmallContainer from "../../../Elements/SmallContainer";
import FieldMap from "../../../Map"
import {ZoneComponent} from "./Zone"
import {ZoneRatioComponent} from "./ZoneRatio"
import {IActionSummary} from "../../../../models/DatabaseModelsSummaries"
import ActionStore from "../../../../components/Action/Store";
import PreferencesStore from "../../../../components/Preferences/Store";
import {ActionImpact, ActionType, Size, Zone, ZoneData} from "../../../../models/ComponentModels";
import {DropDownMenu, MenuItem, Toggle} from "material-ui";
import Spinner from "../../../Elements/Spinner";
import * as ActionsCreator from "../../../../components/Preferences/ActionsCreator"
import LoginStore from "../../../../components/Login/Store";
import injectTapEventPlugin = require("react-tap-event-plugin");
import RightUnderDiv from "../../../Elements/RightUnderDiv";
import LeftUnderDiv from "../../../Elements/LeftUnderDiv";
import Li from "../../../Elements/Li";
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
    readonly widthChoices = [2,3,4,5,6,7,8,9,10,11,12];
    readonly heightChoices = [1,2,3,4,5,6,7,8];
    size_set: Boolean = false;

    constructor(props: ILayoutProps) {
        super(props);
        if(Object.keys(ActionStore.actions).length != 0){
            let actions: IActionSummary[] = ActionStore.getActionsForMatch(this.props.match_id);
            this.state = {
                size: new Size(1200, 600),
                actions: actions,
                action_types: this.getActionTypes(actions),
                action_impacts: this.getActionImpacts(actions),
                zones_size: PreferencesStore.getMapSize(),
            };
        } else {
            this.state = {
                size: new Size(1200, 600),
                actions: ActionStore.getActionsForMatch(this.props.match_id),
                action_types: [],
                action_impacts: [],
                zones_size: new Size(0,0),
            };
        }

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
            zones_size: PreferencesStore.getMapSize()
        })
    }

    componentWillMount() {
        ActionStore.on("RECEIVE_MATCH_ACTIONS", this.setActions);
        PreferencesStore.on("RECEIVE_MAP_SIZE", this.setMapSize);
    }

    componentWillUnmount() {
        ActionStore.removeListener("RECEIVE_MATCH_ACTIONS", this.setActions);
        PreferencesStore.removeListener("RECEIVE_MAP_SIZE", this.setMapSize);
    }

    refs: {
        [string: string]: (Element);
        mainStage: (HTMLElement);
    };


    componentDidMount() {
        let w = this.refs.mainStage.clientWidth * 0.8;
        let h = w / 2;

        this.setState({
            size: new Size(w, h)
        });
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
        let zonesData: ZoneData[]= [];
        for (let action of this.getFilteredActions()) {
            let x: number = Math.floor(action.start_x * this.state.zones_size.width);
            let y: number = Math.floor(action.start_y * this.state.zones_size.height);
            zonesData.push(new ZoneData(x,y, action.impact));
        }
        let zones: Zone[] = [];

        for (let x: number = 0; x < this.state.zones_size.width; x++) {
            for (let y: number = 0; y < this.state.zones_size.height; y++) {
                zones.push(new Zone(x,y, 0, 0));
            }
        }

        for (let zone of zones){
            let nbActions: number = 0;
            let rating: number = 0;
            let nbNeutres: number = 0;

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
        ActionsCreator.SetMapSize(this.props.team_id, new_size, LoginStore.token);
    }
    handleWidthChange(e: __MaterialUI.TouchTapEvent, index: number, menuItemValue: any) {
        let new_size: Size = new Size(menuItemValue,this.state.zones_size.height);
        this.setState({
            zones_size: new_size
        });
        ActionsCreator.SetMapSize(this.props.team_id, new_size, LoginStore.token);
    }

    render() {
        if (this.state.actions.length != 0 && this.size_set) {
            let rawZones = this.getZones();
            let zones = rawZones.map((zone, i) => {
                return <ZoneComponent key={i} zone={zone} zone_size={this.state.zones_size}
                                      parent_size={this.state.size}/>
            });
            let ratios = rawZones.map((zone, i) => {
                return <ZoneRatioComponent key={i} zone={zone} zone_size={this.state.zones_size}
                                           parent_size={this.state.size}/>
            });
            const styles = {
                customWidth: {
                    width: 200,
                },
            };
            const textWidth = this.state.zones_size.width;
            const widthDropDown = this.widthChoices.map((val) => {
                return (
                    <MenuItem key={val} value={val} primaryText={val + " Zones"}/>
                )
            });

            const textHeight = this.state.zones_size.height;
            const heightDropDown = this.heightChoices.map((val) => {
                return (
                    <MenuItem key={val} value={val} primaryText={val + " Zones"}/>
                )
            });
            let action_impact_filter = this.state.action_impacts.map((action_impact) => {
                let style = {color: action_impact.getColor().toString()};
                return <Li key={action_impact.id}><Toggle labelStyle={style}
                                                          onToggle={this.onActionImpactToggle.bind(this)}
                                                          defaultToggled={action_impact.used} value={action_impact.id}
                                                          label={action_impact.name}/></Li>;
            });

            let action_type_filter = this.state.action_types.map((action_type) => {
                return <Li key={action_type.id}><Toggle onToggle={this.onActionTypeToggle.bind(this)}
                                                        defaultToggled={action_type.used} value={action_type.id}
                                                        label={action_type.name}/></Li>;
            });

            return (
                <SmallContainer>
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
                        </RightDiv>
                    </SmallContainer>
                    <LeftUnderDiv>
                        <h3>Nombre de zones verticales</h3>
                        <DropDownMenu value={textHeight} onChange={this.handleHeightChange} style={styles.customWidth}
                                      autoWidth={false}>{heightDropDown}</DropDownMenu>
                    </LeftUnderDiv>
                    <RightUnderDiv>
                        <h3>Nombre de zones horizontales</h3>
                        <DropDownMenu value={textWidth} onChange={this.handleWidthChange} style={styles.customWidth}
                                      autoWidth={false}>{widthDropDown}</DropDownMenu>
                    </RightUnderDiv>
                </SmallContainer>
            );
        }
        this.size_set = true;
        return(
            <div ref="mainStage">
                <SmallContainer>
                    <Spinner/>
                </SmallContainer>
            </div>
        );
    }
}
