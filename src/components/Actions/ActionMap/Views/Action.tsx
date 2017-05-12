import * as React from "react";
import {Circle, Arrow} from 'react-konva';
import {IActionSummary} from "../../../../Models/DatabaseModelsSummaries"
import {RGBColor, Size} from "../../../../Models/ComponentModels"

export interface ILayoutProps {
    params: {
        action: IActionSummary
        color: RGBColor
        parent_size: Size
    }
}

export interface ILayoutState {

}

export class ActionComponent extends React.Component<ILayoutProps, ILayoutState> {
    readonly strokeWidth = 3;

    constructor(props: ILayoutProps) {
        super(props);
    }

    render() {
        let x1 = this.props.params.action.start_x * this.props.params.parent_size.width;
        let y1 = (1 - this.props.params.action.start_y) * this.props.params.parent_size.height;

        if(this.props.params.action.end_x != null && this.props.params.action.end_y != null) {
            let x2 = this.props.params.action.end_x * this.props.params.parent_size.width;
            let y2 = (1 - this.props.params.action.end_y) * this.props.params.parent_size.height;

            return <Arrow points={[x1, y1, x2, y2]} fill={this.props.params.color.toString()} stroke={this.props.params.color.toString()} strokeWidth={this.strokeWidth}/>
        } else {
            let radius = this.props.params.parent_size.height / 50;
            return <Circle x={x1} y={y1} radius={radius} fill={this.props.params.color.toString()} stroke={this.props.params.color.toString()} strokeWidth={this.strokeWidth}/>
        }
    }
}