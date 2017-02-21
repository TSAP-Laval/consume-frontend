import {IAction} from "../../IAction"

import Coordinate from "./models/Coordinate"
import Action from "./models/Action"
import ActionType from "./Filter/models/ActionType"

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

    getActions() {
        return this.actions
    }
}

export class FilterActions implements IAction {
    type: string
    filter: ActionType

    constructor(action_type: ActionType){
        this.type = "FILTER_ACTIONS"
        this.filter = action_type
    }

    getFilter() {
        return this.filter
    }
}