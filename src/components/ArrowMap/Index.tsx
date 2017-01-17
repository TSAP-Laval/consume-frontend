import * as React from "react";
import {Layer, Rect, Stage, Circle, Line} from 'react-konva';
import Store from "./Store"
import * as Actions from "./Actions"

export interface ILayoutProps {
    height:number
}

export interface ILayoutState {
    numbers:number[]
}

export class ArrowMap extends React.Component<ILayoutProps, ILayoutState> {
    height: number;
    width: number;
    readonly mainColor = "black";   
    readonly strokeWidth = 3;

    constructor(props: ILayoutProps) {
        super(props)

        this.state = {
            numbers: Store.getNumbers()
        }

        this.height = this.props.height;    
        this.width = this.height * 2;
    }

    addData(e:MouseEvent){
        Actions.AddNumber();
    }

    componentWillMount(){
        Store.on("change", () => {
            this.setState({
                numbers:Store.getNumbers()
            })
        })
    }

    render() {              
        const NumbersList =  this.state.numbers.map((num) => {
            return <li key={num}>{num}</li>
        })

        return(
            <div>
                <button onClick={this.addData.bind(this)}>ONE LOVE REACT</button>

                <ul>
                    {NumbersList}
                </ul>

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