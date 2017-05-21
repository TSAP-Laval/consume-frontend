import {IAction} from "../../../models/ActionCreation";
import {IUser} from "../../../models/DatabaseModels";
import Dispatcher from "../../Dispatcher";


export class UsersReceivedAction implements IAction {
    type: string;
    users: IUser[];

    constructor(users: IUser[]) {
        this.type = "USERS_RECEIVED";
        this.users = users;
    }
}

export function CreateUsersReceivedAction(users: IUser[]): void {
    Dispatcher.dispatch(new UsersReceivedAction(users));
}