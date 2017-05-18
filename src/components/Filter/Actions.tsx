import {IAction} from "../../models/ActionCreation";
import {Filter} from "../../models/ComponentModels";

export class HandleFilter implements IAction {
    type: string;
    filter: Filter;

    constructor(filter: Filter) {
        this.type = "HANDLE_FILTER";
        this.filter = filter;
    }
}