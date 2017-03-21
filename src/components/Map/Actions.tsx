import IAction from "../IAction"
import {Action, Size} from "./Models"

export class FetchActions implements IAction {
    type: string

    constructor() {
        this.type = "FETCH_ACTIONS"
    }
}

export class ReceiveMapParameters implements IAction {
    type: string
    parameters: Size

    constructor(params: Size) {
        this.type = "RECEIVE_PARAMETERS"
        this.parameters = params
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