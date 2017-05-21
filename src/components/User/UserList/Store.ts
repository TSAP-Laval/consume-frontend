import { EventEmitter } from "events";
import { IUser } from "../../../models/DatabaseModels"
import { IAction } from "../../../models/ActionCreation";
import Dispatcher from "../../Dispatcher";
import {UsersReceivedAction} from "../Actions/UsersReceived";


class UsersStore extends EventEmitter {
    private users: IUser[];
    private userMap: {[userID: string]: IUser};
    private fetching: boolean;

    constructor() {
        super();

        this.users = [];
        this.userMap = {};
        this.fetching = false;
    }

    getFetching(): boolean {
        return this.fetching
    }

    private setFetching(fetching: boolean): void {
        this.fetching = fetching;
        this.emit("fetchStatusChanged");
    }

    getUsers(): IUser[] {
        return this.users;
    }

    private setUsers(users: IUser[]): void {
        this.users = users;

        this.userMap = {};
        users.forEach((u) => {
            this.userMap[u.id] = u;
        });
        this.emit("usersChanged")
    }

    handleActions(action: IAction): void {
        switch (action.type) {
            case "FETCH_USERS":
                this.setFetching(true);
                break;

            case "USERS_RECEIVED":
                let act = action as UsersReceivedAction;
                this.setUsers(act.users);
                this.setFetching(false);
                break;

        }
    }
}

const store = new UsersStore();
Dispatcher.register(store.handleActions.bind(store));
export default store;
