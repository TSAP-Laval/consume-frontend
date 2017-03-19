import dispatcher from "../../dispatcher"
import * as Actions from "./Actions"
import axios from "axios"
import * as Models from "./Models"

import { CreateErrorAction } from "../../Error/ErrorAction";

export function filterActionsByType(action_type: Models.ActionType){
    const filter_action = new Actions.FilterActionsByType(action_type)
    dispatcher.dispatch(filter_action)
}

export function filterActionsByImpact(action_impact: Models.ActionImpact){
    const filter_action = new Actions.FilterActionsByImpact(action_impact)
    dispatcher.dispatch(filter_action)
}      