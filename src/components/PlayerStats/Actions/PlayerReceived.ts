import {IAction} from "../../../models/ActionCreation";
import Dispatcher from "../../Dispatcher";
import {IPlayer} from "../../../models/DatabaseModels";


export class PlayerReceivedAction implements IAction {
    type: string;
    player: IPlayer;

    constructor(player: IPlayer) {
        this.type = "PLAYER_RECEIVED";
        this.player = player;
    }
}

export function CreatePlayerReceivedAction(player: IPlayer) {
    Dispatcher.dispatch(new PlayerReceivedAction(player));
}
