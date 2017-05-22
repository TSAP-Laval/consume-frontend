import * as React from "react";
import {Rect} from 'react-konva';
import {Zone, Size} from "../../../../models/ComponentModels"

export interface ILayoutProps {
    zone: Zone
    zone_size: Size
    parent_size: Size
}

export interface ILayoutState {

}

export class ZoneComponent extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: ILayoutProps) {
        super(props);
    }

    render() {
        let startX: number;
        let zoneWidth = this.props.parent_size.width / this.props.zone_size.width;
        let zoneHeight = this.props.parent_size.height / this.props.zone_size.height;
        startX = zoneWidth * this.props.zone.x;
        let ys: number[] = [];

        for(let _i = this.props.zone_size.height - 1; _i > -1; _i--) {
            ys.push(_i);
        }

        let startY = zoneHeight * ys[this.props.zone.y];
        let color = !isNaN(this.props.zone.rating) ? "hsl("+ Math.floor((this.props.zone.rating * 100) * 120 / 100) +", 50%,50%)" : "white";
        return <Rect x={startX} y={startY} width={zoneWidth} height={zoneHeight} stroke="black" fill={color}/>
    }
}