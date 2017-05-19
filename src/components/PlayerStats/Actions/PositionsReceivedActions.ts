import {IAction} from "../../../models/ActionCreation";
import Dispatcher from "../../Dispatcher"
import { IPosition } from "../Models/IPosition";

export class PositionsReceivedAction implements IAction {
    type = "POSITIONS_RECEIVED";
    Positions: IPosition[];

    constructor(positions: IPosition[]) {
        this.Positions = positions;
    }
}

export function CreatePositionsReceivedAction(positions: IPosition[]) {
    Dispatcher.dispatch(new PositionsReceivedAction(positions));
}
