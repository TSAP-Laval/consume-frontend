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

            //TODO(Loic): WE NEED USER'S INFORMMATIONS.
            let user: IUser = response.data.user as IUser;
            let token: string = response.data.auth_token;
            console.log(response.data);

            CreateOnAuthenticationSucceededAction(token)
        })
        .catch(error => {
            console.log(error.response.data); 
            CreateErrorAction(error.response.data.message);
            //CreateOnAuthenticationFailedAction(error.response.data);
        });
}
//DO NOT DELETE IT
// export function CreateOnAuthenticationSucceededAction(user: IUser, token:string) {
//     dispatcher.dispatch(new Actions.OnAuthenticationSucceeded(user, token));
// }
export function CreateOnAuthenticationSucceededAction(token:string) {
     dispatcher.dispatch(new Actions.OnAuthenticationSucceeded(token));
 }

export function CreateOnAuthenticationFailedAction(error: any) {
    dispatcher.dispatch(new Actions.OnAuthenticationFailed(error));
}