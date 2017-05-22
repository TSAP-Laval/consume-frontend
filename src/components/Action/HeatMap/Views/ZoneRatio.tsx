import * as React from "react";
import {Size, Zone} from "../../../../models/ComponentModels"
import {Text} from "react-konva";

export interface ILayoutProps {
    zone: Zone
    zone_size: Size
    parent_size: Size
}

export interface ILayoutState {

}

export class ZoneRatioComponent extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: ILayoutProps) {
        super(props);
    }


    render() {
        let zoneWidth = this.props.parent_size.width / this.props.zone_size.width;
        let zoneHeight = this.props.parent_size.height / this.props.zone_size.height;
        let numberFormatted = parseFloat((this.props.zone.percentage * 100).toFixed(2));
        let text = !isNaN(numberFormatted)? (numberFormatted.toString() + '%') : '0%';
        let startX = (zoneWidth * this.props.zone.x) + (zoneWidth/2);
        let ys = [];
        for(let _i = this.props.zone_size.height - 1; _i > -1; _i--) {
            ys.push(_i);
        }
        let startY = (zoneHeight * ys[this.props.zone.y]) + (zoneHeight/2);

        return <Text x={startX} y={startY} text={text} fontSize={26}/>
    }
}