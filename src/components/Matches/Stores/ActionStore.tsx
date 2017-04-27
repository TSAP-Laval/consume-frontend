import { EventEmitter } from "events"
import dispatcher from "../../dispatcher"
import IAction from "../../IAction"
import {TeamActions} from "../Models"
import * as Actions from "../Actions"

class ActionStore extends EventEmitter {
    fetching: boolean
    team_actions: TeamActions

    constructor() {
        super()
        this.fetching = false
        this.team_actions = new TeamActions()
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "FETCH_MATCH_ACTIONS":
                this.fetching = true
                this.emit("FETCH_MATCH_ACTIONS")
                break;
            case "RECEIVE_MATCH_ACTIONS":
                this.team_actions = (action as Actions.ReceiveMatchActions).actions
                this.fetching = false
                this.emit("RECEIVE_MATCH_ACTIONS")
                break;
        }
    }
}

const store = new ActionStore();
export default store;

dispatcher.register(store.handleActions.bind(store));