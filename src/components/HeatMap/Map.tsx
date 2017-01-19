import * as React from "react";
import * as Actions from "./Actions"
import Store from "./HeatMapStore"
import Map from "../Map/Index"
import { IZone } from "./models/BaseModels"
import { ProgressBar } from 'react-bootstrap';
import {Layer, Rect, Stage, Circle, Line, Text} from 'react-konva';

export interface ILayoutProps {
}

export interface ILayoutState {
    zones? : IZone[];
    loading? : boolean,
    height?: number,
    width?: number
}

export class HeatMap extends React.Component <ILayoutProps, ILayoutState>{
    height: number;
    width: number;
    playerid: number;
    matchid: number;
    constructor(props: ILayoutProps) {
        super(props);
        this.getZones = this.getZones.bind(this);
        this.setLoadingStatus = this.setLoadingStatus.bind(this)
        this.state = {
            zones: Store.getZones(),
            loading: Store.isFetching()
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

    loadZones() {
        Actions.GetData(this.playerid, this.matchid);
    }

    refs: {
        [string: string]: (Element);
        mainStage: (HTMLElement);
    }
    componentDidMount() {

        let w = this.refs.mainStage.clientWidth
        let h = w / 2;

        this.setState({
            height: h,
            width: w
        });
        this.loadZones();
    }

    getZones() {
        this.setState({
            loading: Store.isFetching(),
            zones: Store.getZones()
        });
    }
  

    render() {
            var zoneWidth = this.state.width/4;
            var zoneHeight = this.state.height/3;
        const Zones = this.state.zones.map((zone, i)=> {
            var startX = zoneWidth * zone.x;
            var ys: number[] = [2,1,0];
            var startY = zoneHeight * ys[zone.y];
            var opacity = zone.percentage * 4;
            var colorZone;
            if(zone.rating < 0.25){
                colorZone = "red"
            } else if (zone.rating < 0.75){
                colorZone = "yellow"
            } else {
                colorZone = "green"
            }

            return <Rect key={i} x={startX} y={startY} width={zoneWidth} height={zoneHeight} stroke="black" fill={colorZone} opacity={opacity}/>
        }) 

        const Texts = this.state.zones.map((zone,i)=>{
            var text =  (Math.round(zone.percentage * 100)).toString() + '%';
            var startX = (zoneWidth * zone.x) + (zoneWidth/2);
            var ys: number[] = [2,1,0];
            var startY = (zoneHeight * ys[zone.y]) + (zoneHeight/2);

            return <Text key={i} x={startX} y={startY} text={text} fontSize={32}/>
        })

        if(!this.state.loading) {
            return(
                <div ref="mainStage">
                    <Stage width={this.state.width} height={this.state.height}>
                        <Layer>{Zones}</Layer>
                        <Layer>{Texts}</Layer>
                        <Map height={this.state.height}/>
                    </Stage>
                </div>
            );
        } else {
            return(
                <div>
                    <h3>{ "Chargement... "}</h3>
                    <ProgressBar active now={45} />
                </div>
            )
        }
    }

}

