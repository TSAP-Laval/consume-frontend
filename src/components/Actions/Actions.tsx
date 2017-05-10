import {IAction} from "../../Models/ActionCreation";
import {Action} from "../../Models/DatabaseModels";

export class FetchMatchActions implements IAction {
    type: string;

    constructor() {
        this.type = "FETCH_MATCH_ACTIONS"
    }
}

export class ReceiveMatchActions implements IAction {
    type: string;
    actions: Action[];

    constructor(actions: Action[]) {
        this.type = "RECEIVE_MATCH_ACTIONS";
        this.actions = actions
    }
}