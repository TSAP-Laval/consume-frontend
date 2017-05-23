import {IAction} from "../../models/ActionCreation";
import {IActionSummary} from "../../models/DatabaseModelsSummaries";
import {Size} from "../../models/ComponentModels";

export class FetchMatchActions implements IAction {
    type: string;

    constructor() {
        this.type = "FETCH_MATCH_ACTIONS"
    }
}

export class ReceiveMatchActions implements IAction {
    type: string;
    match_id: number;
    actions: IActionSummary[];

    constructor(match_id: number, actions: IActionSummary[]) {
        this.type = "RECEIVE_MATCH_ACTIONS";
        this.match_id = match_id;
        this.actions = actions
    }
}