import * as Actions from "./Actions"
import Dispatcher from "../Dispatcher";
import axios from 'axios';
import { CreateErrorAction } from "../Error/ErrorAction";
import {IUser} from "../../Models/DatabaseModels";
import * as Config from 'Config';

export function CreateAuthenticateUserAction(email: string, password: string) {
    Dispatcher.dispatch(new Actions.AuthenticateUser());

    // Define the url
    const url: string = Config.serverUrl + "auth/login";

    axios.post(url, {
        email: email,
        password: password
    },)
        .then((response) => {
            //We fetch the informations of authenticated user.
            let user: IUser = response.data.user as IUser;
            let token: string = response.data.auth_token;

            Dispatcher.dispatch(new Actions.OnAuthenticationSucceeded(user, token));
        })
        .catch(error => { 
            CreateErrorAction(error);
        });
}
