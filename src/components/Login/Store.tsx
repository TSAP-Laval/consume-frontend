import { EventEmitter } from "events"
import {IAction} from "../../Models/ActionCreation";
import * as Actions from "./Actions"
import dispatcher from "../dispatcher"

enum Status {
    Started = 1,
    Idle
}

interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    is_admin: boolean;
}

class LoginStore extends EventEmitter {

    isLoggedIn: boolean;
    requestStatus: Status;
    connectedUser: IUser;
    error: string;

    constructor() {
        super();
        this.isLoggedIn = false;
        this.requestStatus = Status.Idle;
    }

    getRequestStatus(): Status {
        return this.requestStatus;
    }

    isAdmin(): boolean {
        return this.isLoggedIn && this.connectedUser.is_admin;
    }

    getConnectedUser(): IUser {
        return this.connectedUser;
    }

    handleActions(action: IAction) {
        switch (action.type) {
            case "AUTHENTICATE_USER":
                this.requestStatus = Status.Started;
                this.emit("requestState")
                break;
                
            case "AUTHENTICATION_SUCCEEDED":
                let succeeded: Actions.OnAuthenticationSucceeded = action as Actions.OnAuthenticationSucceeded;
                this.connectedUser = succeeded.connectedUser;
                this.isLoggedIn = true;
                this.emit("AuthSucceed")

                // Intialize the state.
                this.requestStatus = Status.Started;
                this.emit("requestState")
                break;

            case "AUTHENTICATION_FAILED":
                let failed: Actions.OnAuthenticationFailed = action as Actions.OnAuthenticationFailed;
                this.error = failed.err;
                this.emit("AuthFailed");
                break;
        }
    }
}

const store = new LoginStore();

dispatcher.register(store.handleActions.bind(store));

export default store;