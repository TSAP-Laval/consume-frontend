import {IAction} from "../../models/ActionCreation";
import {IActionSummary} from "../../models/DatabaseModelsSummaries";
import {Size} from "../../models/ComponentModels";

export class ReceiveMapSize implements IAction {
    type: string;
    map_size: Size;

    constructor(map_size: Size) {
        this.type = "RECEIVE_MAP_SIZE";
        this.map_size = map_size;
    }
}