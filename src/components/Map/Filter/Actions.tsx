import IAction from "../../IAction.tsx"
import {ComponentModels} from "../../../models"

export class FilterActionsByType implements IAction {
    type: string
    filter: ComponentModels.

    constructor(action_type: Models.ActionType){
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