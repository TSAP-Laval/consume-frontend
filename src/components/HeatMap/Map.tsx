import * as React from "react";
import * as Actions from "./Actions"
import Store from "./HeatMapStore"
import Map from "../Map/Index"
import { IZone } from "./models/BaseModels"
import {Layer, Rect, Stage, Circle, Line} from 'react-konva';

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
    readonly mainColor = "black";   
    readonly strokeWidth = 3;
    constructor(props: ILayoutProps) {
        super(props);
        this.getZones = this.getZones.bind(this);
        this.state = {
            zones: Store.getZones()
        }
        this.height = this.state.height;
        this.width = this.height * 2;
        this.playerid = 112;
        this.matchid = 2;
    }

    componentWillMount() {
        Store.on("change", this.getZones);
    }

    componentWillUnmount() {
        Store.removeListener("change", this.getZones);
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
      zones: Store.getZones()
    });
  }
  

    render() {
        const { zones } = this.state;

        return(
            <div>
                <button onClick={this.loadZones.bind(this)}>Load Zones</button>
                <div ref="mainStage">
                    <Stage width={this.state.width} height={this.state.height}>
                        <Map height={this.state.height}/>
                    </Stage>
                </div>
            </div>
        );
    }

}

