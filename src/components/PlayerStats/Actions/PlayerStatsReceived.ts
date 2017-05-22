import {IAction} from "../../../models/ActionCreation";
import Dispatcher from "../../Dispatcher";
import {IPlayer, IPlayerStats} from "../../../models/DatabaseModels";


export class PlayerStatsReceivedAction implements IAction {
    type: string;
    playerStats: IPlayerStats[];

    constructor(playerStats: IPlayerStats[]) {
        this.type = "PLAYER_STATS_RECEIVED";
        this.playerStats = playerStats;
    }
}

export function CreatePlayerStatsReceivedAction(playerStats: IPlayerStats[]) {
    Dispatcher.dispatch(new PlayerStatsReceivedAction(playerStats));
}
