import { EventEmitter } from "events"
import dispatcher from "../../dispatcher"
import IAction from "../../IAction"
import {Filters, ActionImpact, ActionType} from "../../Map/Filters/Models"
import {TeamActions} from "../Models"
import * as Actions from "../Actions"
import * as FilterActions from "../../Map/Filters/Actions"

class ActionStore extends EventEmitter {
    fetching: boolean
    team_actions: TeamActions
    filters: {[component: string] : Filters}

    constructor() {
        super()
        this.fetching = false
        this.team_actions = new TeamActions()
    }

    getActionTypes(component: string) {
        return this.filters[component].action_types
    }

    getActionImpacts(component: string) {
        return this.filters[component].action_impacts
    }

    getFilteredActions(component: string) {
        
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
            case "FILTER_ACTIONS_BY_IMPACT":
                this.filters[(action as FilterActions.FilterActionsByImpact).component].action_impacts = (action as FilterActions.FilterActionsByImpact).action_impacts
                this.emit("FILTER_ACTIONS_BY_IMPACT")
                break;
        }
    }
}

const store = new ActionStore();
export default store;

dispatcher.register(store.handleActions.bind(store));