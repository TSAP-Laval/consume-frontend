import {IAction} from "../../Models/ActionCreation";
import {Filter} from "../../Models/ComponentModels";

export class HandleFilter implements IAction {
    type: string;
    filter: Filter;

    constructor(filter: Filter) {
        this.type = "HANDLE_FILTER";
        this.filter = filter;
    }
}