import * as React from "react";
import {Layer, Rect, Stage, Circle, Line, Arrow} from 'react-konva';

export interface ILayoutProps {
    height:number
}

export interface ILayoutState {}

export default class Map extends React.Component<ILayoutProps, ILayoutState> {
    height: number
    width: number
    
    readonly mainColor = "green"
    readonly strokeWidth = 3

    constructor(props: ILayoutProps) {
        super(props)

        this.height = this.props.height
        this.width = this.height * 2
    }

    render() {
        return(
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
                <Circle x={this.width/2} y={this.height/2} radius={this.height/6} stroke={this.mainColor} strokeWidth={this.strokeWidth} />
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
        )
    } 
}