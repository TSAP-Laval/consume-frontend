import * as BaseModels from "./BaseModels"

export interface IPlayerActions {
    match_id: string;
    date: string;
    actions: BaseModels.IAction[];
}

