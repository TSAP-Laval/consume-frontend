import * as React from "react";
import {Layer, Stage} from 'react-konva';
import LeftDiv from "../../../Elements/LeftDiv";
import RightDiv from "../../../Elements/RightDiv";
import SmallContainer from "../../../Elements/SmallContainer";
import FieldMap from "../../../Map"
import {ActionComponent} from "./Action"
import {IActionSummary} from "../../../../models/DatabaseModelsSummaries"
import {RGBColor, Size} from "../../../../models/ComponentModels"
import {ActionImpact, ActionType} from "../../../../models/ComponentModels";
import ActionStore from "../../../../components/Action/Store";
import {Toggle} from "material-ui";
import Spinner from "../../../Elements/Spinner";

export interface ILayoutProps {
    match_id: number
}

export interface ILayoutState {
    size?: Size,
    actions?: IActionSummary[],
    action_types?: ActionType[],
    action_impacts?: ActionImpact[]
}

export class ActionMapComponent
    extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: ILayoutProps) {
        super(props);

        this.state = {
            size: new Size(1200, 600),
            actions: ActionStore.getActionsForMatch(this.props.match_id),
            action_types: [],
            action_impacts: []
        };

        this.setActions = this.setActions.bind(this);
        this.getActionImpacts = this.getActionImpacts.bind(this);
        this.getActionTypes = this.getActionTypes.bind(this);
    }

    setActions() {
        let actions: IActionSummary[] = ActionStore.getActionsForMatch(this.props.match_id);

        this.setState({
            actions: actions,
            action_types: this.getActionTypes(actions),
            action_impacts: this.getActionImpacts(actions)
        })
    }

    componentWillMount() {
        ActionStore.on("RECEIVE_MATCH_ACTIONS", this.setActions);
    }

    componentWillUnmount() {
        ActionStore.removeListener("RECEIVE_MATCH_ACTIONS", this.setActions);
    }

    refs: {
        [string: string]: (Element);
        mainStage: (HTMLElement);
    };

    componentDidMount() {
        let w = this.refs.mainStage.clientWidth * 0.8;
        let h = w / 2;

        this.setState({
            size: new Size(w, h)
        });
    }

    getActionImpacts(actions: IActionSummary[]) {
        let action_impacts: Array<ActionImpact> = [];

        for(let action of actions) {
            if(action_impacts.map((impact) => impact.id).indexOf(action.impact) === -1) {
                action_impacts.push(new ActionImpact(action.impact));
            }
        }

        return action_impacts;
    }

    getActionTypes(actions: IActionSummary[]) {
        let action_types: Array<ActionType> = [];

        for(let action of actions) {
            if(action_types.map((action_type) => action_type.id).indexOf(action.type.id) === -1) {
                action_types.push(new ActionType(action.type.id, action.type.description));
            }
        }

        return action_types
    }

    getFilteredActions() {

        let usedImpacts = this.state.action_impacts.filter((i) => i.used).map(i => i.id);

        let usedTypes = this.state.action_types.filter((t) => t.used).map(t => t.id);

        return this.state.actions.filter(action =>
            usedImpacts.indexOf(action.impact) !== -1 && usedTypes.indexOf(action.type.id) !== -1
        );

    }

    onActionTypeToggle(e: React.FormEvent<HTMLInputElement>) {

        let value: number = parseInt(e.currentTarget.value);

        let currentDisplayState = this.state.action_types;

        let newState = currentDisplayState.map((actType) => {
            if (actType.id === value) {
                actType.used = (e.target as any).checked;
            }
            return actType;
        });

        this.setState({
            action_types: newState
        });
    }

    onActionImpactToggle(e: React.FormEvent<HTMLInputElement>) {
        let value = parseInt(e.currentTarget.value);

        let currentDisplayState = this.state.action_impacts;

        let newState = currentDisplayState.map(actImpact => {
            if (actImpact.id === value) {
                actImpact.used = (e.target as any).checked;
            }
            return actImpact
        });

        this.setState({
            action_impacts: newState
        });
    }

    render() {
        if (this.state.actions.length != 0) {
            let actions = this.getFilteredActions().map((action) => {
                let color: RGBColor = this.state.action_impacts.filter((impact) => {return impact.id == action.impact})[0].getColor();
                return <ActionComponent key={action.id} params={{action: action, color: color, parent_size: this.state.size}}/>
            });

            let action_impact_filter = this.state.action_impacts.map((action_impact) => {
                let style = {color: action_impact.getColor().toString()};
                return <li key={action_impact.id}><Toggle labelStyle={style} onToggle={this.onActionImpactToggle.bind(this)} defaultToggled={action_impact.used} value={action_impact.id} label={action_impact.name}/></li>;
            });

            let action_type_filter = this.state.action_types.map((action_type) => {
                return <li key={action_type.id}><Toggle onToggle={this.onActionTypeToggle.bind(this)} defaultToggled={action_type.used} value={action_type.id} label={action_type.name}/></li>;
            });

            return (
                <SmallContainer>
                    <LeftDiv>
                        <div ref="mainStage">
                            <Stage width={this.state.size.width} height={this.state.size.height}>
                                <FieldMap height={this.state.size.height}/>
                                <Layer>{actions}</Layer>
                            </Stage>
                        </div>
                    </LeftDiv>
                    <RightDiv>
                        <h3>Impact de l'action</h3>
                        <ul>{action_impact_filter}</ul>
                        <h3>Type d'action</h3>
                        <ul>{action_type_filter}</ul>
                    </RightDiv>
                </SmallContainer>
            );
        }
        return(
            <div ref="mainStage">
                <SmallContainer>
                    <Spinner/>
                </SmallContainer>
            </div>
        )
    }
}