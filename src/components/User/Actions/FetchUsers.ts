import axios, {AxiosResponse} from 'axios';

import {IAction} from "../../../models/ActionCreation";
import Dispatcher from "../../Dispatcher";

import { CreateErrorAction } from "../../Error/ErrorAction";

import * as Config from 'Config';
import {IUser} from "../../../models/DatabaseModels";
import {CreateUsersReceivedAction} from "./UsersReceived";


export class FetchUsers implements IAction {
    type: string;

    constructor() {
        this.type = "FETCH_USERS";
    }
}


export function CreateFetchUsersAction() {
    Dispatcher.dispatch(new FetchUsers());

    let url: string = Config.serverUrl + 'users';

    axios.get(url).then(
        (resp: AxiosResponse) => {
            let users = resp.data.data.hits as IUser[];
            CreateUsersReceivedAction(users);
        },
        (err) => {
            CreateErrorAction(err.toString());
        }
    )
}