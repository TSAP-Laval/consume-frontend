import * as React from "react";
import {Layer, Rect, Stage, Circle, Line, Arrow} from 'react-konva';
import { ProgressBar } from 'react-bootstrap';
import * as ActionsCreator from "./ActionsCreator"
import ActionModel from "./models/Action"
import Map from "../Index"
import Store from "./Store"
import ActionType from "./Filter/models/ActionType"
import ActionMapFilter from "./Filter/Index"

export interface ILayoutProps {
}

export interface ILayoutState {
    actions ? : ActionModel[],
    loading ? : boolean,
    height?: number,
    width?: number
}

export class ActionMap extends React.Component<ILayoutProps, ILayoutState> {
    
    readonly mainColor = "green";
    readonly actionColor = "black"   
    readonly strokeWidth = 3;

    constructor(props: ILayoutProps) {
        super(props)

        this.state = {
            actions: new Array<ActionModel>(),
            loading: false
        }

        this.setLoadingStatus = this.setLoadingStatus.bind(this)
        this.setActions = this.setActions.bind(this)
    }

    setLoadingStatus() {
        this.setState({
            loading: Store.fetching
        })
    }

    setActions() {
        this.setState({
            actions: Store.getActions(),
            loading: Store.fetching
        })
    }

    componentWillMount() {
        Store.on("FETCH_ACTIONS", this.setLoadingStatus)
        Store.on("RECEIVE_ACTIONS", this.setActions)
        Store.on("FILTER_ACTIONS", this.setActions)
    }

    componentWillUnmount() {
        Store.removeListener("FETCH_ACTIONS", this.setLoadingStatus)
        Store.removeListener("RECEIVE_ACTIONS", this.setActions)
        Store.removeListener("FILTER_ACTIONS", this.setActions)
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
        ActionsCreator.getActions(1, 116)
    }

    render() {
        const Actions = this.state.actions.map((action, i) => {
            var x1 = action.start.x * this.state.width
            var y1 = (1 - action.start.y) * this.state.height

            if(action.end != null) {
                var x2 = action.end.x * this.state.width
                var y2 = (1 - action.end.y) * this.state.height

                return <Arrow key={i} points={[x1, y1, x2, y2]} stroke={this.actionColor} strokeWidth={this.strokeWidth}/>
            } else {
                var radius = this.state.height / 50
                return <Circle key={i} x={x1} y={y1} radius={radius} fill={this.actionColor} stroke={this.actionColor} strokeWidth={this.strokeWidth}/>
            }
        })

        if(!this.state.loading) {
            return(
                <div ref="mainStage">
                    <Stage width={this.state.width} height={this.state.height}>
                        <Map height={this.state.height}/>
                        <Layer>{Actions}</Layer>
                    </Stage>
                    <ActionMapFilter></ActionMapFilter>
                </div>
            );
        } else {
            return(
                <div>
                    <h3>{ "Chargement... "}</h3>
                    <ProgressBar active now={45} />
                </div>
            )
        }
    }
}