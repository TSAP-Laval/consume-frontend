import * as React from "react";
import {Circle, Arrow} from 'react-konva';
import {Action} from "../../Models/DatabaseModels"
import {Size} from "../../Models/ComponentModels"

export interface ILayoutProps {
    action: Action
    parent_size: Size
}

export interface ILayoutState {

}

export class ActionComponent extends React.Component<ILayoutProps, ILayoutState> {
    readonly strokeWidth = 3;

    constructor(props: ILayoutProps) {
        super(props);
    }

    render() {
        let x1 = this.props.action.start.x * this.props.parent_size.width;
        let y1 = (1 - this.props.action.start.y) * this.props.parent_size.height;

        if(this.props.action.end != null) {
            let x2 = this.props.action.end.x * this.props.parent_size.width;
            let y2 = (1 - this.props.action.end.y) * this.props.parent_size.height;

            return <Arrow points={[x1, y1, x2, y2]} strokeWidth={this.strokeWidth}/>
        } else {
            let radius = this.props.parent_size.height / 50;
            return <Circle x={x1} y={y1} radius={radius} strokeWidth={this.strokeWidth}/>
        }
    }
}