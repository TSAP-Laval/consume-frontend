import * as React from "react";
import {Layer, Rect, Stage, Circle, Line} from 'react-konva';

export interface ILayoutProps {
    height:number
}

export interface ILayoutState {}

export class ArrowMap extends React.Component<ILayoutProps, ILayoutState>{

    readonly width = this.props.height * 2;
    readonly height = this.props.height;
    readonly mainColor = "black";
    readonly strokeWidth = 3;

    renderMap(){
        return(<Stage width={this.width} height={this.height}>
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
        </Stage>);
    }

    render() {
        return(this.renderMap());
    }
}