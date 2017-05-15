import * as Actions from "./Actions"
import dispatcher from "../dispatcher";
import axios from 'axios';
import { CreateErrorAction } from "../Error/ErrorAction";
import {IUser} from "../../Models/DatabaseModels";
import * as Config from 'Config';

export function CreateAuthenticateUserAction(email: string, password: string) {
    dispatcher.dispatch(new Actions.AuthenticateUser());


    // On définit l'URL à partir duquel axios va effectuer son call asyncrhone.
    var url: string = Config.serverUrl + "/login";

    axios.post(url, {
        email: email,
        password: password
    })
        .then((response) => {
            //We fetch the informations of authenticated user.
            let user: IUser = response.data.user as IUser;

            CreateOnAuthenticationSucceededAction(user)
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
            CreateErrorAction(error);
            //CreateOnAuthenticationFailedAction(error.response.data);
        });
}

export function CreateOnAuthenticationSucceededAction(user: IUser) {
    dispatcher.dispatch(new Actions.OnAuthenticationSucceeded(user));
}

export function CreateOnAuthenticationFailedAction(error: any) {
    dispatcher.dispatch(new Actions.OnAuthenticationFailed(error));
}