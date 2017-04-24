import * as React from "react";
import {Layer, Rect, Stage, Circle, Line, Arrow} from 'react-konva';
import * as ActionsCreator from "../ActionsCreator"
import {Action} from "../Models"
import Map from "../Index"
import MapStore from "../Store"
import ActionTypeFilter from "../Filter/ActionTypeFilter"
import ActionImpactFilter from "../Filter/ActionImpactFilter"

import FilterStore from "../Filter/Store"
import * as FilterModels from "../Filter/Models"

import LeftDiv from "../../Elements/LeftDiv";
import RightDiv from "../../Elements/RightDiv";
import SmallContainer from "../../Elements/SmallContainer";
import Spinner from "../../Elements/Spinner";

export interface ILayoutProps {
    playerID: number,
    teamID: number
}

export interface ILayoutState {
    actions ? : Action[],
    action_types ? : FilterModels.ActionType[],
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
            actions: new Array<Action>(),
            loading: false
        }

        this.setLoadingStatus = this.setLoadingStatus.bind(this)
        this.setActions = this.setActions.bind(this)
        this.renderActions = this.renderActions.bind(this)
    }

    setLoadingStatus() {
        this.setState({
            loading: MapStore.fetching
        })
    }

    setActions() {
        this.setState({
            actions: FilterStore.getAllFilteredActions(),
            loading: MapStore.fetching,
            action_types: FilterStore.action_types
        })
    }

    renderActions() {
        let radius = this.state.height / 50

        const actions = this.state.actions.map((action, i) => {

            let types = this.state.action_types.map((action_type) => {
                return action_type.type;
            })
            var typeIndex = types.indexOf(action.type.name);
            var arrowColor = this.state.action_types[typeIndex].color;

            const style = 'rgb(' + arrowColor.r + ", " + arrowColor.g + ", " + arrowColor.b + ")"

            var x1 = action.start.x * this.state.width;
            var y1 = (1 - action.start.y) * this.state.height;

            if(action.end != null) {
                var x2 = action.end.x * this.state.width
                var y2 = (1 - action.end.y) * this.state.height

                return <Arrow fill={style} key={i} points={[x1, y1, x2, y2]} stroke={style} strokeWidth={this.strokeWidth}/>
            } else {
                return <Circle fill={style} key={i} x={x1} y={y1} radius={radius} stroke={style} strokeWidth={this.strokeWidth}/>
            }
        })

        return actions
    }

    componentWillMount() {
        MapStore.on("FETCH_ACTIONS", this.setLoadingStatus)
        MapStore.on("RECEIVE_ACTIONS", this.setActions)
        FilterStore.on("FILTER_ACTIONS_BY_TYPE", this.setActions)
        FilterStore.on("FILTER_ACTIONS_BY_IMPACT", this.setActions)
    }

    componentWillUnmount() {
        MapStore.removeListener("FETCH_ACTIONS", this.setLoadingStatus)
        MapStore.removeListener("RECEIVE_ACTIONS", this.setActions)
        FilterStore.removeListener("FILTER_ACTIONS_BY_TYPE", this.setActions)
        FilterStore.removeListener("FILTER_ACTIONS_BY_IMPACT", this.setActions)
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

        ActionsCreator.getActions(this.props.teamID, this.props.playerID)
    }

    render() {
        if(!this.state.loading) {
            let actions = this.renderActions()

            return(
                <SmallContainer>
                    <LeftDiv>
                        <div ref="mainStage">
                            <Stage width={this.state.width} height={this.state.height}>
                                <Map height={this.state.height}/>
                                <Layer>{actions}</Layer>
                            </Stage>
                        </div>
                    </LeftDiv>
                    <RightDiv>
                        <ActionImpactFilter></ActionImpactFilter>
                        <ActionTypeFilter></ActionTypeFilter>
                    </RightDiv>
                </SmallContainer>
            );
        } else {
            return(
                <Spinner />
            )
        }
    }
}
