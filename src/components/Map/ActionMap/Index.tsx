import * as React from "react";
import {Layer, Rect, Stage, Circle, Line, Arrow} from 'react-konva';
import * as ActionsCreator from "../ActionsCreator"
import {Action} from "../../Matches/Models"
import Map from "../Index"

import ActionTypeFilter from "../Filters/Views/ActionTypeFilter"
import ActionImpactFilter from "../Filters/Views/ActionImpactFilter"
import * as FilterModels from "../Filters/Models"

import LeftDiv from "../../Elements/LeftDiv";
import RightDiv from "../../Elements/RightDiv";
import SmallContainer from "../../Elements/SmallContainer";
import Spinner from "../../Elements/Spinner";

import ActionStore from "../../Matches/Stores/ActionStore"

export interface ILayoutProps {
    params: {
        actions: Action[]
    }
}

export interface ILayoutState {
    actions ? : Action[],
    action_types ? : FilterModels.ActionType[],
    loading ? : boolean,
    height?: number,
    width?: number
}

export default class ActionMap extends React.Component<ILayoutProps, ILayoutState> {
    readonly mainColor = "green";
    readonly actionColor = "black"
    readonly strokeWidth = 3;

    constructor(props: ILayoutProps) {
        super(props)

        this.state = {
            loading: false,
            actions: this.props.params.actions,
            action_types: ActionStore.getActionTypes("ACTION_MAP")
        }

        this.renderActions = this.renderActions.bind(this)
    }

    renderActions() {
        let radius = this.state.height / 50

        console.log("Actions: ", this.state.actions);
        console.log('Action types: ', this.state.action_types);

        const actions = this.state.actions.map((action, i) => {

            let types = this.state.action_types.map((action_type) => {
                return action_type.type;
            })
            var typeIndex = types.indexOf(action.description);
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

    }

    componentWillUnmount() {
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
                        <ActionImpactFilter params={{component: "ACTION_MAP", actions: this.state.actions}}></ActionImpactFilter>
                    </RightDiv>
                </SmallContainer>
            );
        } else {
            return(<Spinner />)
        }
    }
}
