import * as React from "react";
import * as Actions from "./Actions"
import Store from "./HeatMapStore"
import { IZone } from "./models/BaseModels"
import {Layer, Rect, Stage, Circle, Line} from 'react-konva';

export interface ILayoutProps {
    height:number
}

export interface ILayoutState {
    zones: IZone[];
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
        this.height = this.props.height;    
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

    getZones() {
    this.setState({
      zones: Store.getZones()
    });
  }

    render() {
        const { zones } = this.state;
        console.log(zones)

        return(
            <div>
                <button onClick={this.loadZones.bind(this)}>Load Zones</button>
                <Stage width={this.width} height={this.height}>
                    <Layer>
                        <Rect
                            x={0} y={0} width={this.width} height={this.height}
                            stroke={this.mainColor}
                            strokeWidth={this.strokeWidth}
                        />
                        <Rect
                            x={0} y={this.height / 4} width={this.width/8} height={this.height/2}
                            stroke={this.mainColor}
                            strokeWidth={this.strokeWidth}
                        />
                        <Circle x={this.width/2} y={this.height/2} radius={this.height/6} stroke="black" strokeWidth={this.strokeWidth} />
                        <Line
                            stroke={this.mainColor}
                            strokeWidth={this.strokeWidth}
                            points={[this.width/2, 0, this.width / 2, this.height]}
                        />
                        <Rect
                            x={this.width * 7/8} y={this.height / 4} width={this.width/8} height={this.height/2}
                            stroke={this.mainColor}
                            strokeWidth={this.strokeWidth}
                        />
                    </Layer>
                </Stage>
            </div>
        );
    }

}

