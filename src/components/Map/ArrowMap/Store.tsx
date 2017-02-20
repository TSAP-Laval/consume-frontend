import { EventEmitter } from "events";
import { IAction } from "../../IAction"
import * as Actions from "./Actions"
import Action from "./models/Action"
import ActionType from "./Filter/models/ActionType"
import dispatcher from "../../dispatcher";

class ActionMapStore extends EventEmitter {
    actions: Action[]
    action_types: ActionType[]
    filtered: Action[]
    fetching: boolean

    constructor() {
        super();
        this.actions = new Array<Action>()
        this.action_types = new Array<ActionType>()
        this.fetching = false
    }

    setActions(actions: Action[]){
        this.actions = actions
    }
    
    getActions() {
        let used_types = this.action_types.filter((x) => {
            return x.isUsed() == true
        }).map((y) => {
            return y.getType()
        })

        return this.actions.filter((action) => {
            return used_types.indexOf(action.getType()) != -1
        })
    }

    setActionTypes(actions: Action[]) {
        let types = this.action_types.map((action) => {
            return action.getType()
        })

        for(let action of actions) {
            if(types.indexOf(action.getType()) == -1) {
                this.action_types.push(new ActionType(action.getType(), true))
                actions = actions.filter((x) => {
                    return x.getType() != action.getType()
                })
            }
        }
    }

    receiveActions(actions: Action[]){
        this.setActions(actions)
        this.setActionTypes(this.actions)
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "FETCH_ACTIONS":
                this.fetching = true
                this.emit("FETCH_ACTIONS")
                break;
            case "RECEIVE_ACTIONS":
                this.receiveActions((action as Actions.ReceiveActions).getActions())
                this.fetching = false
                this.emit("RECEIVE_ACTIONS")
                break;
        }
    }
}

const store = new ActionMapStore();
export default store;

dispatcher.register(store.handleActions.bind(store));