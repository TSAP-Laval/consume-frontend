import IAction from "../../IAction"
import * as Models from "./Models"

export class FilterActionsByType implements IAction {
    type: string
    filter: Models.ActionTypeFilter

    constructor(action_type: Models.ActionTypeFilter){
        this.type = "FILTER_ACTIONS_BY_TYPE"
        this.filter = action_type
    }
}

export class FilterActionsByImpact implements IAction {
    type: string
    filter: Models.ActionImpact

    constructor(action_impact: Models.ActionImpact){
        this.type = "FILTER_ACTIONS_BY_IMPACT"
        this.filter = action_impact
    }
}