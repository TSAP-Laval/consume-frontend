import {IAction} from "../../Models/ActionCreation"

import dispatcher from "../dispatcher";

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