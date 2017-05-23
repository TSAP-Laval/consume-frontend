import {IAction} from "../../models/ActionCreation"
import Dispatcher from "../Dispatcher";

export class ErrorAction implements IAction  {
    type = "ERROR_OCCURED";
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}

export function CreateErrorAction(message: string) {
    Dispatcher.dispatch(new ErrorAction(message));
}