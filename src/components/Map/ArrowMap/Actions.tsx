import {IAction} from "../../IAction"

import Coordinate from "./models/Coordinate"
import Action from "./models/Action"
import ActionType from "./Filter/models/ActionType"
import ActionImpact from "./Filter/models/ActionImpact"

export class FetchActions implements IAction {
    type: string

    constructor() {
        this.type = "FETCH_ACTIONS"
    }
}

export class ReceiveActions implements IAction {
    type: string
    actions: Action[]

    constructor(actions: Action[]) {
        this.type = "RECEIVE_ACTIONS"
        this.actions = actions
    }
}

export class FilterActionsByType implements IAction {
    type: string
    filter: ActionType

    constructor(action_type: ActionType){
        this.type = "FILTER_ACTIONS_BY_TYPE"
        this.filter = action_type
    }
}

export class FilterActionsByImpact implements IAction {
    type: string
    filter: ActionImpact

    constructor(action_impact: ActionImpact){
        this.type = "FILTER_ACTIONS_BY_IMPACT"
        this.filter = action_impact
    }
}