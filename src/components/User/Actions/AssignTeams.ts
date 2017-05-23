import axios, {AxiosResponse} from 'axios';

import {IAction} from "../../../models/ActionCreation";
import {IUser} from "../../../models/DatabaseModels";

import Dispatcher from "../../Dispatcher";
import * as Config from "Config";
import {CreateErrorAction} from "../../Error/ErrorAction";
import {CreateFetchUsersAction} from "./FetchUsers";


export class AssignTeamsAction implements IAction {
    type: string;
    teamsIds: Array<number>;
    userId: number;

    constructor(userId: number, teamsIds: Array<number>) {
        this.type = "ASSIGN_TEAMS";
        this.userId = userId;
        this.teamsIds = teamsIds;
    }

}

export function CreateAssignTeamsAction(userId: number, teams:Array<number>, 
token: string): void {
    Dispatcher.dispatch(new AssignTeamsAction(userId, teams));

    let instance = axios.create({
        headers: {"X-Auth-Token": token}
    });

    let url: string = Config.serverUrl + 'users/' + userId + "/teams";

    instance.put(url, teams).then(
        () => {
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}