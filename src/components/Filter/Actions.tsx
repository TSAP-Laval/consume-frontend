import {IAction} from "../../models/ActionCreation";
import {Filter} from "../../models/ComponentModels";

export class CreateFilters implements IAction {
    type: string;
    filters: Filter[];

    constructor(filters: Filter[]) {
        this.type = "CREATE_FILTERS";
        this.filters = filters;
    }
}

export class HandleFilter implements IAction {
    type: string;
    filter: Filter;

    constructor(filter: Filter) {
        this.type = "HANDLE_FILTER";
        this.filter = filter;
    }
}