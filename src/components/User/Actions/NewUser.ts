import axios, {AxiosResponse} from 'axios';

import {IAction} from "../../../models/ActionCreation";
import {IUser} from "../../../models/DatabaseModels";

import Dispatcher from "../../Dispatcher";
import * as Config from "Config";
import {CreateErrorAction} from "../../Error/ErrorAction";
import {CreateFetchUsersAction} from "./FetchUsers";


export class NewUserAction implements IAction {
    type: string;
    user: IUser;

    constructor(u: IUser) {
        this.type = "NEW_USER";
        this.user = u;
    }

}

export function CreateNewUserAction(u: IUser): void {
    Dispatcher.dispatch(new NewUserAction(u));

    let url: string = Config.serverUrl + 'users';

    axios.post(url, u).then(
        () => {
            CreateFetchUsersAction();
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}