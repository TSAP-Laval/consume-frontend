import axios, {AxiosResponse} from 'axios';

import {IAction} from "../../../models/ActionCreation";
import {IUser} from "../../../models/DatabaseModels";

import Dispatcher from "../../Dispatcher";
import * as Config from "Config";
import {CreateErrorAction} from "../../Error/ErrorAction";
import {CreateFetchUsersAction} from "./FetchUsers";
import {CreateAddTeamsAction} from "./AddTeams";


export class NewUserAction implements IAction {
    type: string;
    user: IUser;

    constructor(u: IUser) {
        this.type = "NEW_USER";
        this.user = u;
    }

}

export function CreateNewUserAction(u: IUser, teamIDs: number[], token: string): void {
    Dispatcher.dispatch(new NewUserAction(u));

    let instance = axios.create({
        headers: {"X-Auth-Token": token}
    });

    let url: string = Config.serverUrl + 'users';

    instance.post(url, u).then(
        (resp: AxiosResponse) => {
            CreateAddTeamsAction(resp.data.data.id, teamIDs, token);
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}