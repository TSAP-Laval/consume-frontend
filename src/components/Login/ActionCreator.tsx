import * as Actions from "./Actions"
import Dispatcher from "../Dispatcher";
import axios from 'axios';
import {IUser} from "../../models/DatabaseModels";
import * as Config from 'Config';
import {browserHistory} from "react-router";
import {OnLoginErrorAction} from "./Actions";

export function CreateAuthenticateUserAction(email: string, password: string) {
    Dispatcher.dispatch(new Actions.AuthenticateUser());

    // Define the url
    const url: string = Config.serverUrl + "auth/login";

    axios.post(url, {
        email: email,
        password: password
    })
    .then((response) => {
        //We fetch the informations of authenticated user.
        let user: IUser = response.data.user as IUser;
        let token: string = response.data.auth_token;
        Dispatcher.dispatch(new Actions.OnAuthenticationSucceeded(user, token));
        browserHistory.push('/team');
    },
    () => {
        CreateOnLoginErrorAction("Courriel / Mot de passe invalide");
    })
}

export function CreateOnLoginErrorAction(message: string) {
    Dispatcher.dispatch(new OnLoginErrorAction(message));
}
