import * as Actions from "./Actions"
import dispatcher from "../dispatcher";
import axios from 'axios';
import { CreateErrorAction } from "../Error/ErrorAction";
import {IUser} from "../../Models/DatabaseModels";
import * as Config from 'Config';

export function CreateAuthenticateUserAction(email: string, password: string) {
    dispatcher.dispatch(new Actions.AuthenticateUser());


    // Define the url
    const url: string = Config.serverUrl + "/login";
    const token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhdXRoIiwidXNlciI6eyJmaXJzdF9uYW1lIjoiS2V2aW4iLCJsYXN0X25hbWUiOiJLaW0iLCJpc19hZG1pbiI6dHJ1ZSwibW9kaWZpZWRfYXQiOiIyMDE3LTA1LTE2VDAyOjQwOjIyKzAwOjAwIiwiY3JlYXRlZF9hdCI6IjIwMTctMDUtMTZUMDI6NDA6MjIrMDA6MDAiLCJlbWFpbCI6InN0ZXBoZW5yb2RyaWd1ZXpAaG90bWFpbC5jb20iLCJpZCI6NSwidGVhbXMiOltdfSwiaWF0IjoxNDk0OTAzNjc2fQ.KcQAvgfdvrmpRJyfHe2s8RntxwflHdBGPMjQQbRdje4";

    // Added the token into headers.
    let instance = axios.create({
             headers: {"X-Auth-Token":token}
    })

    instance.post(url, {
        email: email,
        password: password
    },)
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