import dispatcher from "../../dispatcher"
import { CreateErrorAction } from "../../Error/ErrorAction";

import * as Models from "./Models"
import * as Actions from "./Actions"

export function filterActionsByType(component: string, action_types: Models.ActionType[]) {
    const filter = new Actions.FilterActionsByType(component, action_types)
    dispatcher.dispatch(filter)
}

export function filterActionsByImpact(component: string, action_impacts: Models.ActionImpact[]) {
    const filter = new Actions.FilterActionsByImpact(component, action_impacts)
    dispatcher.dispatch(filter)
}