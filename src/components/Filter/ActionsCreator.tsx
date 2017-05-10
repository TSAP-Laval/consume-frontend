import dispatcher from "../dispatcher"
import * as Actions from "./Actions"
import {Filter} from "../../Models/ComponentModels";

export function handleFilter(filter: Filter){
    let create_filter = new Actions.HandleFilter(filter);
    dispatcher.dispatch(create_filter)
}