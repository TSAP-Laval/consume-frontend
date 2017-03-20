import * as React from "react";
import * as Actions from "./Actions"
import Store from "./HeatMapStore"
import Map from "../Map/Index"
import { IZone, IHeatMapSize } from "./models/BaseModels"
import CircularProgress from 'material-ui/CircularProgress';
import {Layer, Rect, Stage, Circle, Line, Text} from 'react-konva';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

export interface ILayoutProps {
}

export interface ILayoutState {
    zones? : IZone[];
    loading? : boolean,
    height?: number,
    width?: number,
    filters?: string[],
    actionTypes?: {[type: string]: number},
    mapSize?: IHeatMapSize;
}

export class HeatMap extends React.Component <ILayoutProps, ILayoutState>{
    height: number;
    width: number;
    playerid: number;
    matchid: number;
    constructor(props: ILayoutProps) {
        var injectTapEventPlugin = require("react-tap-event-plugin");
        injectTapEventPlugin();
        super(props);
        this.getZones = this.getZones.bind(this);
        this.setLoadingStatus = this.setLoadingStatus.bind(this);
        this.handleChangeHeight = this.handleChangeHeight.bind(this);
        this.handleChangeWidth = this.handleChangeWidth.bind(this);
        var mapSize: IHeatMapSize = {
            height: 6,
            width: 10
        }
        this.state = {
            loading: Store.isFetching(),
            filters: [],
            mapSize: mapSize,
            zones: Store.getZones(mapSize.width,mapSize.height,[]),
            actionTypes: Store.getActionTypes()
        }
        this.height = this.state.height;
        this.width = this.height * 2;
        this.playerid = 116;
        this.matchid = 1;
    }
    componentWillMount() {
        Store.on("GET_ZONES", this.setLoadingStatus);
        Store.on("RECIEVE_ZONES", this.getZones);
    }

    componentWillUnmount() {
        Store.removeListener("GET_ZONES", this.setLoadingStatus);
        Store.removeListener("RECIEVE_ZONES", this.getZones);
    }

    setLoadingStatus() {
        this.setState({
            loading: Store.isFetching()
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
        Actions.GetData(this.playerid, this.matchid);
    }
    handleChangeHeight(e: __MaterialUI.TouchTapEvent, index: number, menuItemValue: any) {
        var mapSize : IHeatMapSize = {
            height: menuItemValue,
            width: this.state.mapSize.width
        }
        this.setState({
            mapSize: mapSize,
            zones: Store.getZones(mapSize.width,mapSize.height, this.state.filters)
        });
    }
    handleChangeWidth(e: __MaterialUI.TouchTapEvent, index: number, menuItemValue: any) {
        var mapSize : IHeatMapSize = {
            height: this.state.mapSize.height,
            width: menuItemValue
        }
        this.setState({
            mapSize: mapSize,
            zones: Store.getZones(mapSize.width,mapSize.height, this.state.filters)
        });
    }

    handleCheck(event: React.FormEvent<HTMLInputElement>) {
        var checked: string = event.currentTarget.value;
        var allTypes : string[] = this.state.filters;
        var index = allTypes.indexOf(checked);
        if (index == -1){
            allTypes.push(checked);
        } else {
            allTypes.splice(index,1);
        }
        this.setState({
            filters: allTypes,
            zones: Store.getZones(this.state.mapSize.width,this.state.mapSize.height, allTypes)
        });
    }

    getZones() {
        this.setState({
            loading: Store.isFetching(),
            zones: Store.getZones(this.state.mapSize.width,this.state.mapSize.height, []),
            actionTypes: Store.getActionTypes()
        });
    }


    render() {
            var zoneWidth = this.state.width/this.state.mapSize.width;
            var zoneHeight = this.state.height/this.state.mapSize.height;
            var choicesWidth: number[] = [2,3,4,5,6,7,8,9,10,11,12];
            var choicesHeight: number[] = [1,2,3,4,5,6,7,8];
            var types = new Array();
            for(var type in this.state.actionTypes){
                types.push(type);
            }
            const styles = {
                customWidth: {
                    width: 200,
                },
            };
            const TextWidth = this.state.mapSize.width;
            const WidthDropDown = choicesWidth.map((val,i) => {
                return (
                    <MenuItem value={val} primaryText={val + " Zones"} />
                )
            })
            const TextHeight = this.state.mapSize.height;
            const HeightDropDown = choicesHeight.map((val,i) => {
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
            var startX = zoneWidth * zone.x;
            var ys: number[] = new Array();
            for(var _i = this.state.mapSize.height - 1; _i > -1; _i--) {
                ys.push(_i);
            }
            var startY = zoneHeight * ys[zone.y];
            var color = !isNaN(zone.rating) ? "hsl("+ Math.floor((zone.rating * 100) * 120 / 100) +", 50%,50%)" : "white";
            return <Rect key={i} x={startX} y={startY} width={zoneWidth} height={zoneHeight} stroke="black" fill={color}/>
        })

        const Texts = this.state.zones.map((zone,i)=>{
            var text =  (Math.round(zone.percentage * 100)).toString() + '%';
            var startX = (zoneWidth * zone.x) + (zoneWidth/2);
            var ys: number[] = new Array();
            for(var _i = this.state.mapSize.height - 1; _i > -1; _i--) {
                ys.push(_i);
            }
            var startY = (zoneHeight * ys[zone.y]) + (zoneHeight/2);

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

