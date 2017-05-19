import {IAction} from "../../Models/ActionCreation";
import {IUser} from "../../Models/DatabaseModels";

export class AuthenticateUser implements IAction {
    type: string;

    constructor() {
        this.type = "AUTHENTICATE_USER";
    }
}

export class OnAuthenticationSucceeded implements IAction {
    type: string;
    connectedUser: IUser;
    token : string;

    constructor(user: IUser, token:string) {
        this.type = "AUTHENTICATION_SUCCEEDED";
        this.connectedUser = user;
        this.token = token;
    }

}

export class OnAuthenticationFailed implements IAction {
    type: string;
    err: string;

    constructor(error: any) {
        this.type = "AUTHENTICATION_FAILED";
        this.err = error;
    }

}
