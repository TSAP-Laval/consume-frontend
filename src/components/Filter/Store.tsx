import { EventEmitter } from "events"
import {IAction} from "../../models/ActionCreation"
import {Filter} from "../../models/ComponentModels"
import * as Actions from "./Actions"
import Dispatcher from "../Dispatcher"

/*class FilterStore extends EventEmitter {
    filters: {[component: string] : {[name: string] : Filter}};

    constructor() {
        super();
        this.filters = {};
    }

    createFilters(filters: Filter[]) {
        for(let filter of filters) {
            if(this.filters[filter.component] == null) {
                this.filters[filter.component] = {};
            }
            this.filters[filter.component][filter.name] = filter;
        }
    }

    updateFilter(filter: Filter) {
        this.filters[filter.component][filter.name] = filter;
    }

    getFiltersByComponent(component: string): {[name: string] : Filter}{
        return this.filters[component];
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "CREATE_FILTERS":
                this.createFilters((action as Actions.CreateFilters).filters);
                this.emit(action.type);
                break;
            case "HANDLE_FILTER":
                this.updateFilter((action as Actions.HandleFilter).filter);
                this.emit(action.type);
                break;
        }
    }
}*/

//const store = new FilterStore();
//export default store;

//Dispatcher.register(store.handleActions.bind(store));