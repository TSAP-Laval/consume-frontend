import IAction from "../IAction";

interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    is_admin: boolean;
}

export class AuthenticateUser implements IAction {
    type: string;

    constructor() {
        this.type = "AUTHENTICATE_USER";
    }
}

export class OnAuthenticationSucceeded implements IAction {
    type: string;
    connectedUser: IUser;

    constructor(user: IUser) {
        this.type = "AUTHENTICATION_SUCCEEDED";
        this.connectedUser = user;
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
