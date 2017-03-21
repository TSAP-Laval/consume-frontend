import * as React from "react";
import * as Actions from "./Actions"
import Store from "./HeatMapStore"
import Map from "../Map/Index"
import { IZone } from "./models/BaseModels"
import {Layer, Rect, Stage, Circle, Line, Text} from 'react-konva';

import Toggle from 'material-ui/Toggle';

import { Li } from "../Elements";

import LeftDiv from "../Elements/LeftDiv";
import RightDiv from "../Elements/RightDiv";
import SmallContainer from "../Elements/SmallContainer";
import { Spinner } from "../Elements/spinner";

export interface ILayoutProps {
}

export interface ILayoutState {
    zones? : IZone[];
    loading? : boolean,
    height?: number,
    width?: number,
    actions?: string[],
    searchTypes?: string[]
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
            actions: Store.getActions(),
            loading: Store.isFetching(),
            searchTypes: []
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
        Actions.GetData(this.playerid, this.matchid, this.state.searchTypes);
    }

    handleCheck(event: React.FormEvent<HTMLInputElement>) {
        var checked: string = event.currentTarget.value;
        var allTypes : string[] = this.state.searchTypes;
        var index = allTypes.indexOf(checked);
        if (index == -1){
            allTypes.push(checked);
        } else {
            allTypes.splice(index,1);
        }
        this.setState({
            loading: Store.isFetching(),
            searchTypes: allTypes
        });
        Actions.GetData(this.playerid, this.matchid, allTypes);
    }

    getZones() {
            this.setState({
                loading: Store.isFetching(),
                zones: Store.getZones(),
                actions: Store.getActions()
            });
    }


    render() {
            var zoneWidth = this.state.width/4;
            var zoneHeight = this.state.height/3;
            const ActionTypes = this.state.actions.map((action, i) => {
                return (
                    <Li><Toggle
                        label={action}
                        checked={this.state.searchTypes.indexOf(action) != -1}
                        value={action}
                        onToggle={this.handleCheck.bind(this)}
                    /></Li>
                )
            })
        const Zones = this.state.zones.map((zone, i)=> {
            var startX = zoneWidth * zone.x;
            var ys: number[] = [2,1,0];
            var startY = zoneHeight * ys[zone.y];
            var color = !isNaN(zone.rating) ? "hsl("+ Math.floor((zone.rating * 100) * 120 / 100) +", 50%,50%)" : "white";
            return <Rect key={i} x={startX} y={startY} width={zoneWidth} height={zoneHeight} stroke="black" fill={color}/>
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
                <SmallContainer>
                    <LeftDiv>
                        <div ref="mainStage">
                            <Stage width={this.state.width} height={this.state.height}>
                                <Layer>{Zones}</Layer>
                                <Layer>{Texts}</Layer>
                                <Map height={this.state.height}/>
                            </Stage>
                        </div>
                    </LeftDiv>
                    <RightDiv>
                        <h3>Types d'Actions</h3>
                        <ul>
                        {ActionTypes}
                        </ul>
                    </RightDiv>
                </SmallContainer>
            );
        } else {
            return(
                <Spinner />
            )
        }
    }

}

