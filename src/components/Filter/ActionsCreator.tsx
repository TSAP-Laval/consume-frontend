import Dispatcher from "../Dispatcher"
import * as Actions from "./Actions"
import {Filter} from "../../models/ComponentModels";

export function CreateFilters(filters: Filter[]) {
    let create_filters = new Actions.CreateFilters(filters);
    Dispatcher.dispatch(create_filters);
}

export function HandleFilter(filter: Filter){
    let handle_filter = new Actions.HandleFilter(filter);
    Dispatcher.dispatch(handle_filter);
}