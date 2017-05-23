import axios, {AxiosResponse} from 'axios';

import {IAction} from "../../../models/ActionCreation";
import {IUser} from "../../../models/DatabaseModels";

import Dispatcher from "../../Dispatcher";
import * as Config from "Config";
import {CreateErrorAction} from "../../Error/ErrorAction";
import {CreateFetchUsersAction} from "./FetchUsers";


export class AddTeamsAction implements IAction {
    type: string;

    constructor() {
        this.type = "ADD_TEAMS";
    }

}

export function CreateAddTeamsAction(userID: number, teamIDs: number[], token: string): void {
    Dispatcher.dispatch(new AddTeamsAction());

    let instance = axios.create({
        headers: {"X-Auth-Token": token}
    });

    let url: string = Config.serverUrl + 'users/' + userID + '/teams';

    instance.put(url, {'teams': teamIDs}).then(
        () => {
            CreateFetchUsersAction(token);
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}