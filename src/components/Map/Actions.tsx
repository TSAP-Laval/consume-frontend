import {IAction} from "../../models/ActionCreation";
import { Size } from "../../models/ComponentModels";

export class FetchActions implements IAction {
    type: string

    constructor() {
        this.type = "FETCH_ACTIONS"
    }
}

export class ReceiveActions implements IAction {
    type: string
    actions: IAction[]

    constructor(actions: IAction[]) {
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