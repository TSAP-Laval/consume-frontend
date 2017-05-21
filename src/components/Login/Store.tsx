import { EventEmitter } from "events";
import { IAction } from "../../Models/ActionCreation";
import * as Actions from "./Actions"
import Dispatcher from "../Dispatcher"
import { Status } from "../PlayerStats/Models/Status";
import {IUser} from "../../Models/DatabaseModels";

class LoginStore extends EventEmitter {

    isLoggedIn: boolean;
    requestStatus: Status;
    connectedUser: IUser;
    error: string;
    token: string;

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

    handleActions(action: IAction) {
        switch (action.type) {
            case "AUTHENTICATE_USER":
                this.requestStatus = Status.Started;
                this.emit("requestState");
                break;

            case "AUTHENTICATION_SUCCEEDED":
                let succeeded: Actions.OnAuthenticationSucceeded = action as Actions.OnAuthenticationSucceeded;
                this.connectedUser = succeeded.connectedUser;
                this.token = succeeded.token;
                this.isLoggedIn = true;
                this.emit("AuthSucceed");

                // Intialize the state.
                this.requestStatus = Status.Started;
                this.emit("requestState");
                break;
        }
    }
}

const store = new LoginStore();
export default store;

Dispatcher.register(store.handleActions.bind(store));