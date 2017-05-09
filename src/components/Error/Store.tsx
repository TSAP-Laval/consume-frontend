import { EventEmitter } from "events";
import {IAction} from "../../Models/ActionCreation";
import dispatcher from "../dispatcher";
import { ErrorAction } from "./ErrorAction";

class ErrorStore extends EventEmitter {
    error: string;

    constructor() {
        super();
        this.error = null;
    }

    getError(): string {
        return this.error;
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "ERROR_OCCURED":
                this.error = (action as ErrorAction).message;
                this.emit("errorOccured");
                break;
        }
    }
}

const store = new ErrorStore();
dispatcher.register(store.handleActions.bind(store));
export default store;