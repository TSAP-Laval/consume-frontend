import * as React from "react";
import {Layer, Rect, Stage, Circle, Line, Arrow} from 'react-konva';
import * as ActionsCreator from "./ActionsCreator"
import ArrowModel from "./models/Arrow"
import Store from "./Store"

export interface ILayoutProps {
    height:number
}

export interface ILayoutState {
    arrows ? : ArrowModel[]
    loading ? : boolean
}

export class ArrowMap extends React.Component<ILayoutProps, ILayoutState> {
    height: number;
    width: number;
    
    readonly mainColor = "green";
    readonly arrowColor = "black"   
    readonly strokeWidth = 3;

    constructor(props: ILayoutProps) {
        super(props)

        this.height = this.props.height
        this.width = this.height * 2

        this.state = {
            arrows: new Array<ArrowModel>(),
            loading: false
        }

        this.setLoadingStatus = this.setLoadingStatus.bind(this)
        this.setArrows = this.setArrows.bind(this)
    }

    setLoadingStatus() {
        this.setState({
            loading: Store.fetching
        })
    }

    setArrows() {
        this.setState({
            arrows: Store.getArrows(),
            loading: Store.fetching
        })
    }

    componentWillMount() {
        Store.on("FETCH_ARROWS", this.setLoadingStatus)
        Store.on("RECEIVE_ARROWS", this.setArrows)
    }

    componentWillUnmount() {
        Store.removeListener("FETCH_ARROWS", this.setLoadingStatus)
        Store.removeListener("RECEIVE_ARROWS", this.setArrows)
    }

    componentDidMount() {
        ActionsCreator.getArrows(1, 116)
    }

    render() {
        const Arrows = this.state.arrows.map((arrow, i) => {
            var x1 = arrow.start.x * this.width
            var x2 = arrow.end.x * this.width
            var y1 = (1 - arrow.start.y) * this.height
            var y2 = (1 - arrow.end.y) * this.height

            return <Arrow key={i} points={[x1, y1, x2, y2]} stroke={this.arrowColor} strokeWidth={this.strokeWidth}/>
        })

        if(!this.state.loading) {
            return(
                <div>
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

                            {Arrows}
                        </Layer>
                    </Stage>
                </div>
            );
        } else {
            return(
                <div>
                    <p>CHARGEMENT ...</p>
                </div>
            )
        }
    }
}