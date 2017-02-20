import {IAction} from "../../IAction"

import Coordinate from "./models/Coordinate"
import Action from "./models/Action"

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