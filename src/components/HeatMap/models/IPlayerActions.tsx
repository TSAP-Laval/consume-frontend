import * as BaseModels from "./BaseModels"

export interface IPlayerActions {
    match_id: string;
    date: string;
    team: BaseModels.ITeam;
    opposing: string;
    actions: BaseModels.IAction[];
}

