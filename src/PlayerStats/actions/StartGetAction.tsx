import { IAction } from "../../interfaces"

export default class StartGetAction implements IAction {
    type: "START_GET"

    PlayerID: number;
    TeamID: number;

    constructor(playerId: number, teamId: number) {
        this.PlayerID = playerId;
        this.TeamID = teamId;
    }
}