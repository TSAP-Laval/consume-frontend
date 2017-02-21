import {IAction} from "../../IAction"
import {IZone} from "../models/BaseModels"

export class GetData implements IAction {
    type: String;

    constructor() {
        this.type = "GET_ZONES";
    }
}

export class RecieveData implements IAction {
    type: String;
    zones: IZone[];
    actionsTypes: string[];

    constructor(zones: IZone[], actionTypes: string[]){
        this.type = "RECIEVE_ZONES";
        this.zones = zones;
        this.actionsTypes = actionTypes;
    }
}