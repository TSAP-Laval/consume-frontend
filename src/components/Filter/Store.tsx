import { EventEmitter } from "events"
import {IAction} from "../../models/ActionCreation"
import {Filter} from "../../models/ComponentModels"
import * as Actions from "./Actions"
import dispatcher from "../Dispatcher"

class FilterStore extends EventEmitter {
    filters: {[component: string] : {[name: string] : Filter}};

    constructor() {
        super();
        this.filters = {};
    }

    getFiltersByComponent(component: string): {[name: string] : Filter}{
        return this.filters[component];
    }

    private updateFilter(filter: Filter) {
        this.filters[filter.component][filter.name] = filter;
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "HANDLE_FILTER":
                this.updateFilter((action as Actions.HandleFilter).filter);
                this.emit(action.type);
                break;
        }
    }
}

const store = new FilterStore();
export default store;

dispatcher.register(store.handleActions.bind(store));