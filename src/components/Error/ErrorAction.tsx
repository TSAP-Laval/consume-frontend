import {IAction} from "../../models/ActionCreation"

import dispatcher from "../Dispatcher";

export class ErrorAction implements IAction  {
    type = "ERROR_OCCURED";
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}

export function CreateErrorAction(message: string) {
    dispatcher.dispatch(new ErrorAction(message));
}