import {IAction} from "../../IAction"

import Coordinate from "./models/Coordinate"
import Action from "./models/Action"

export class FetchActions implements IAction {
    type: String

    constructor() {
        this.type = "FETCH_ACTIONS"
    }
}

export class ReceiveActions implements IAction {
    type: String
    actions: Action[]

    constructor(actions: Action[]) {
        this.type = "RECEIVE_ACTIONS"
        this.actions = actions
    }

    getActions() {
        return this.actions
    }
}