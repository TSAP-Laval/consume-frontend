import {IAction} from "../../models/ActionCreation";
import {IActionSummary} from "../../models/DatabaseModelsSummaries";

export class FetchMatchActions implements IAction {
    type: string;

    constructor() {
        this.type = "FETCH_MATCH_ACTIONS"
    }
}

export class ReceiveMatchActions implements IAction {
    type: string;
    actions: IActionSummary[];

    constructor(actions: IActionSummary[]) {
        this.type = "RECEIVE_MATCH_ACTIONS";
        this.actions = actions
    }
}