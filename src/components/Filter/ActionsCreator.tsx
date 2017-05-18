import dispatcher from "../Dispatcher"
import * as Actions from "./Actions"
import {Filter} from "../../models/ComponentModels";

export function handleFilter(filter: Filter){
    let create_filter = new Actions.HandleFilter(filter);
    dispatcher.dispatch(create_filter)
}