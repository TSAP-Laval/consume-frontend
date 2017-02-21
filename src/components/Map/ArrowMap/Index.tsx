import * as React from "react";
import {Layer, Rect, Stage, Circle, Line, Arrow} from 'react-konva';
import * as ActionsCreator from "./ActionsCreator"
import ActionModel from "./models/Action"
import Map from "../Index"
import Store from "./Store"
import ActionType from "./Filter/models/ActionType"
import ActionMapFilter from "./Filter/Index"

import CircularProgress from 'material-ui/CircularProgress';

export interface ILayoutProps {
}

export interface ILayoutState {
    actions ? : ActionModel[],
    action_types ? : ActionType[],
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
            loading: Store.fetching,
            action_types: Store.getActionTypes()
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

            let types = this.state.action_types.map((type) => {
                return type.getType();
            })

            var typeIndex = types.indexOf(action.getType());
            var arrowColor = this.state.action_types[typeIndex].getColor();

            const style = 'rgb(' + arrowColor.r + ", " + arrowColor.g + ", " + arrowColor.b + ")"

            var x1 = action.start.x * this.state.width;
            var y1 = (1 - action.start.y) * this.state.height;

            if(action.end != null) {
                var x2 = action.end.x * this.state.width
                var y2 = (1 - action.end.y) * this.state.height

                return <Arrow fill={style} key={i} points={[x1, y1, x2, y2]} stroke={style} strokeWidth={this.strokeWidth}/>
            } else {
                var radius = this.state.height / 50
                return <Circle fill={style} key={i} x={x1} y={y1} radius={radius} stroke={style} strokeWidth={this.strokeWidth}/>
            }
        })

        if(!this.state.loading) {
            return(
                <div className="container">
                    <div ref="mainStage" className="left">
                        <Stage width={this.state.width} height={this.state.height}>
                            <Map height={this.state.height}/>
                            <Layer>{Actions}</Layer>
                        </Stage>
                    </div>
                    <ActionMapFilter></ActionMapFilter>
                </div>
            );
        } else {
            return(
                <div>
                    <h3>{ "Chargement... "}</h3>
                    <CircularProgress size={60} thickness={7} />
                </div>
            )
        }
    }
}
