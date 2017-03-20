import {IAction} from "../../IAction"
import * as BaseModels from "../models/BaseModels"

export class GetData implements IAction {
    type: String;

    constructor() {
        this.type = "GET_ZONES";
    }
}

export class RecieveData implements IAction {
    type: String;
    actions: BaseModels.IAction[];

    constructor(actions: BaseModels.IAction[]){
        this.type = "RECIEVE_ZONES";
        this.actions = actions;
    }
}