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

    getActionTypes(){
        return this.action_types;
    }

    updateActions(action_type: ActionType){
        let index = this.action_types.map((type) => {
            return type.getType()
        }).indexOf(action_type.getType())

        if(index != -1) {
            this.action_types[index].setUse(action_type.isUsed())
        }
    }

    setActionTypes(actions: Action[]) {
        this.action_types =  actions.reduce((acc, action) => {
            if(acc.indexOf(action.getType()) == -1) {
                acc.push(action.getType())
            }
            return acc;
        }, new Array<string>()).map((type) => (new ActionType(type, true)));
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
            case "FILTER_ACTIONS":
                this.updateActions((action as Actions.FilterActions).getFilter())
                this.emit("FILTER_ACTIONS")
                break;
        }
    }
}

const store = new ActionMapStore();
export default store;

dispatcher.register(store.handleActions.bind(store));