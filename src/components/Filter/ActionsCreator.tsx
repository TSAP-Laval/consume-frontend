import Dispatcher from "../Dispatcher"
import * as Actions from "./Actions"
import {Filter} from "../../models/ComponentModels";

export function handleFilter(filter: Filter){
    let create_filter = new Actions.HandleFilter(filter);
    Dispatcher.dispatch(create_filter)
}