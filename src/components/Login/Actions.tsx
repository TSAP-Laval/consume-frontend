import {IAction} from "../../models/ActionCreation";
import {IUser} from "../../models/DatabaseModels";

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

    constructor(user:IUser, token:string) {
        this.type = "AUTHENTICATION_SUCCEEDED";
        this.connectedUser = user;
        this.token = token;
    }

}

export class OnLoginErrorAction implements IAction {
    type: string;
    message: string;

    constructor(message: string) {
        this.type = "AUTHENTICATION_ERROR";
        this.message = message;
    }
}
