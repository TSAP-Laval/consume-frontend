import IAction from "../../IAction"
import {ActionImpact, ActionType} from "./Models"

export class FilterActionsByType implements IAction {
    type: string
    component: string
    action_types: ActionType[]

    constructor(component: string, action_type: ActionType[]) {
        this.type = "FILTER_ACTIONS_BY_TYPE"
        this.component = component
        this.action_types = action_type
    }
}

export class FilterActionsByImpact implements IAction {
    type: string
    component: string
    action_impacts: ActionImpact[]

    constructor(component: string, action_impact: ActionImpact[]) {
        this.type = "FILTER_ACTIONS_BY_IMPACT"
        this.component = component
        this.action_impacts = action_impact
    }
}