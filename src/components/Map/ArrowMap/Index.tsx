import * as React from "react";
import {Layer, Rect, Stage, Circle, Line, Arrow} from 'react-konva';
import * as ActionsCreator from "./ActionsCreator"
import ArrowModel from "./models/Arrow"
import Map from "../Index"
import Store from "./Store"

export interface ILayoutProps {
}

export interface ILayoutState {
    arrows ? : ArrowModel[],
    loading ? : boolean,
    height?: number,
    width?: number
}

export class ArrowMap extends React.Component<ILayoutProps, ILayoutState> {
    
    readonly mainColor = "green";
    readonly arrowColor = "black"   
    readonly strokeWidth = 3;

    constructor(props: ILayoutProps) {
        super(props)

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

    refs: {
        [string: string]: (Element);
        mainStage: (HTMLElement);
    }

    componentDidMount() {

        let w = this.refs.mainStage.clientWidth
        let h = w / 2;

        this.setState({
            height: h,
            width: w
        });
        ActionsCreator.getArrows(1, 116)
    }

    render() {
        const Arrows = this.state.arrows.map((arrow, i) => {
            var x1 = arrow.start.x * this.state.width
            var x2 = arrow.end.x * this.state.width
            var y1 = (1 - arrow.start.y) * this.state.height
            var y2 = (1 - arrow.end.y) * this.state.height

            return <Arrow key={i} points={[x1, y1, x2, y2]} stroke={this.arrowColor} strokeWidth={this.strokeWidth}/>
        })

        if(!this.state.loading) {
            return(
                <div ref="mainStage">
                    <Stage width={this.state.width} height={this.state.height}>
                        <Map height={this.state.height}/>
                        <Layer>{Arrows}</Layer>
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