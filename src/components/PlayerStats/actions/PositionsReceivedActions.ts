import  IAction  from "../../IAction"
import dispatcher from "../../dispatcher"

import { IPosition } from "../models/IPosition";

import * as Config from 'Config';

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
