import {IAction} from "../../../models/ActionCreation";
import Dispatcher from "../../Dispatcher";

import { CreateGetMatchesAction } from "./GetMatchesAction";


export class ChangeFilterAction implements IAction {
    type = "FILTER_SELECT";

    SelectedSeason: number;
    SelectedPosition: number;

    constructor(selectedSeason: number, selectedPosition: number) {
        this.SelectedSeason = selectedSeason;
        this.SelectedPosition = selectedPosition;
    }
}

export function CreateChangeFilterAction(seasonID: number, positionID: number, playerID: number, teamID: number) {
    Dispatcher.dispatch(new ChangeFilterAction(seasonID, positionID));
    CreateGetMatchesAction(playerID, teamID, seasonID, positionID)
}
