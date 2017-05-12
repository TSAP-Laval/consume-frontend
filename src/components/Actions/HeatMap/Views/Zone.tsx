import * as React from "react";
import {Circle, Arrow} from 'react-konva';
import {IActionSummary} from "../../../../Models/DatabaseModelsSummaries"
import {Zone, Size} from "../../../../Models/ComponentModels"

export interface ILayoutProps {
    zone: Zone
    parent_size: Size
}

export interface ILayoutState {

}

export class ZoneComponent extends React.Component<ILayoutProps, ILayoutState> {
    readonly strokeWidth = 3;

    constructor(props: ILayoutProps) {
        super(props);
    }

    render() {
        let x1 = this.props.action.start_x * this.props.parent_size.width;
        let y1 = (1 - this.props.action.start_y) * this.props.parent_size.height;

        if(this.props.action.end_x != null && this.props.action.end_y != null) {
            let x2 = this.props.action.end_x * this.props.parent_size.width;
            let y2 = (1 - this.props.action.end_y) * this.props.parent_size.height;

            return <Arrow points={[x1, y1, x2, y2]} fill={this.props.color.toString()} stroke={this.props.color.toString()} strokeWidth={this.strokeWidth}/>
        } else {
            let radius = this.props.parent_size.height / 50;
            return <Circle x={x1} y={y1} radius={radius} fill={this.props.color.toString()} stroke={this.props.color.toString()} strokeWidth={this.strokeWidth}/>
        }
    }
}