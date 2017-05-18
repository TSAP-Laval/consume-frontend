import {IAction} from "../../../models/ActionCreation";
import dispatcher from "../../Dispatcher"
import { IPosition } from "../Models/IPosition";

export class PositionsReceivedAction implements IAction {
    type = "POSITIONS_RECEIVED";
    Positions: IPosition[];

    constructor(positions: IPosition[]) {
        this.Positions = positions;
    }
}

export function CreatePositionsReceivedAction(positions: IPosition[]) {
    dispatcher.dispatch(new PositionsReceivedAction(positions));
}
