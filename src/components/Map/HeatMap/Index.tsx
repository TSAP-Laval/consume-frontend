import * as React from "react";
import * as Actions from "../Actions"
import MapStore from "../Store"
import Map from "../Index"
import {Zone, Size} from "../models"
import * as ActionsCreator from "../ActionsCreator"
import CircularProgress from 'material-ui/CircularProgress';
import {Layer, Rect, Stage, Circle, Line, Text} from 'react-konva';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

export interface ILayoutProps {
    playerID: number,
    teamID: number
}

export interface ILayoutState {
    zones? : Zone[];
    loading? : boolean,
    filters?: string[],
    actionTypes?: {[type: string]: number},
    size?: Size,
    width?: number,
    height?: number
}

export class HeatMap extends React.Component <ILayoutProps, ILayoutState>{
    constructor(props: ILayoutProps) {
        var injectTapEventPlugin = require("react-tap-event-plugin");
        injectTapEventPlugin();
        super(props);

        this.state = {
            loading: false,
            filters: [],
            size: new Size(10, 6),
            zones: MapStore.getZones(10, 6, []),
            actionTypes: MapStore.getActionTypes()
        }

        this.getZones = this.getZones.bind(this);
        this.setLoadingStatus = this.setLoadingStatus.bind(this);
        this.handleChangeHeight = this.handleChangeHeight.bind(this);
        this.handleChangeWidth = this.handleChangeWidth.bind(this);
    }

    componentWillMount() {
        MapStore.on("FETCH_ACTIONS", this.setLoadingStatus)
        MapStore.on("RECEIVE_ACTIONS", this.getZones)
    }

    componentWillUnmount() {
        MapStore.removeListener("FETCH_ACTIONS", this.setLoadingStatus)
        MapStore.removeListener("RECEIVE_ACTIONS", this.getZones)
    }

    setLoadingStatus() {
        this.setState({
            loading: MapStore.fetching
        })
    }

    refs: {
        [string: string]: (Element);
        mainStage: (HTMLElement);
    }

    componentDidMount() {
        let w = this.refs.mainStage.clientWidth;
        let h = w / 2;

        this.setState({
            height: h,
            width: w
        });
    }

    handleChangeHeight(e: __MaterialUI.TouchTapEvent, index: number, menuItemValue: any) {
        this.setState({
            size: new Size(this.state.width, menuItemValue),
            zones: MapStore.getZones(this.state.width, menuItemValue, this.state.filters)
        });
    }

    handleChangeWidth(e: __MaterialUI.TouchTapEvent, index: number, menuItemValue: any) {
        this.setState({
            size: new Size(menuItemValue, this.state.height),
            zones: MapStore.getZones(menuItemValue, this.state.height, this.state.filters)
        });
    }

    handleCheck(event: React.FormEvent<HTMLInputElement>) {
        let checked = event.currentTarget.value;
        let index = this.state.filters.indexOf(checked);

        if (index == -1)
            this.state.filters.push(checked);
        else
            this.state.filters.splice(index, 1);
        
        this.setState({
            zones: MapStore.getZones(this.state.size.width, this.state.size.height, this.state.filters)
        });
    }

    getZones() {
        this.setState({
            loading: MapStore.fetching,
            zones: MapStore.getZones(this.state.size.width, this.state.size.height, []),
            actionTypes: MapStore.getActionTypes()
        });
    }


    render() {
            let zoneWidth = this.state.width/this.state.size.width;
            let zoneHeight = this.state.height/this.state.size.height;

            let widthChoices = [2,3,4,5,6,7,8,9,10,11,12];
            let heightChoices = [1,2,3,4,5,6,7,8];

            let types = new Array();

            for(var type in this.state.actionTypes){
                types.push(type);
            }

            const styles = {
                customWidth: {
                    width: 200,
                },
            };

            const TextWidth = this.state.size.width;
            const WidthDropDown = widthChoices.map((val,i) => {
                return (
                    <MenuItem value={val} primaryText={val + " Zones"} />
                )
            })

            const TextHeight = this.state.size.height;
            const HeightDropDown = heightChoices.map((val,i) => {
                return (
                    <MenuItem value={val} primaryText={val + " Zones"} />
                )
            })

            const ActionTypes = types.map((action, i) => {
                return (
                    <li>
                        <Toggle
                        label={action + " (" + this.state.actionTypes[action] + " actions)"}
                        checked={this.state.filters.indexOf(action) != -1}
                        value={action}
                        onToggle={this.handleCheck.bind(this)}
                    /></li>
                )
            })

        const Zones = this.state.zones.map((zone, i)=> {
            var startX = zoneWidth * zone.coordinate.x;
            var ys: number[] = new Array();

            for(var _i = this.state.size.height - 1; _i > -1; _i--) {
                ys.push(_i);
            }
            
            var startY = zoneHeight * ys[zone.coordinate.y];
            var color = !isNaN(zone.rating) ? "hsl("+ Math.floor((zone.rating * 100) * 120 / 100) +", 50%,50%)" : "white";
            return <Rect key={i} x={startX} y={startY} width={zoneWidth} height={zoneHeight} stroke="black" fill={color}/>
        })

        const Texts = this.state.zones.map((zone,i)=>{
            var text =  (Math.round(zone.percentage * 100)).toString() + '%';
            var startX = (zoneWidth * zone.coordinate.x) + (zoneWidth/2);
            var ys: number[] = new Array();
            for(var _i = this.state.size.height - 1; _i > -1; _i--) {
                ys.push(_i);
            }
            var startY = (zoneHeight * ys[zone.coordinate.y]) + (zoneHeight/2);

            return <Text key={i} x={startX} y={startY} text={text} fontSize={32}/>
        })

        if(!this.state.loading) {
            return(
                <div className="container">
                    <div ref="mainStage" className="left">
                        <Stage width={this.state.width} height={this.state.height}>
                            <Layer>{Zones}</Layer>
                            <Layer>{Texts}</Layer>
                            <Map height={this.state.height}/>
                        </Stage>
                    </div>
                    <div className="right">
                        <h3>Types d'Actions</h3>
                        <ul>
                        {ActionTypes}
                        </ul>
                        <div>
                            <h3>Choix du nombre de zones</h3>
                            <h4>Hauteur</h4>
                            <DropDownMenu value={TextHeight} onChange={this.handleChangeHeight} style={styles.customWidth} autoWidth={false}>
                                {HeightDropDown}
                            </DropDownMenu>
                            <h4>Longeur</h4>
                            <DropDownMenu value={TextWidth} onChange={this.handleChangeWidth} style={styles.customWidth} autoWidth={false}>
                                {WidthDropDown}
                            </DropDownMenu>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div>
                    <h3>{ "Chargement... "}</h3>
                    <CircularProgress size={60} thickness={7} />
                </div>
            )
        }
    }

}

