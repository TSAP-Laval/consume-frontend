import IAction from "../IAction.tsx"
import {Action, Size} from "./Models"

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

export class ReceiveMapParameters implements IAction {
    type: string
    parameters: Size

    constructor(params: Size) {
        this.type = "RECEIVE_PARAMETERS"
        this.parameters = params
    }
}