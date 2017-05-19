import * as Actions from "./Actions"
import dispatcher from "../dispatcher";
import axios from 'axios';
import { CreateErrorAction } from "../Error/ErrorAction";
import {IUser} from "../../Models/DatabaseModels";
import * as Config from 'Config';

export function CreateAuthenticateUserAction(email: string, password: string) {
    dispatcher.dispatch(new Actions.AuthenticateUser());


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

            CreateOnAuthenticationSucceededAction(user, token)
        })
        .catch(error => { 
            CreateErrorAction(error.response.data.message);
        });
}

 export function CreateOnAuthenticationSucceededAction(user: IUser, token:string) {
     dispatcher.dispatch(new Actions.OnAuthenticationSucceeded(user, token));
 }
