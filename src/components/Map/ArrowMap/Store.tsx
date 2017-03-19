import { EventEmitter } from "events";
import { IAction } from "../../IAction"
import * as Actions from "./Actions"
import Action from "./models/Action"
import ActionType from "./Filter/models/ActionType"
import ActionImpact from "./Filter/models/ActionImpact"
import RGBColor from "./Filter/models/RGBColor"
import dispatcher from "../../dispatcher";

class ActionMapStore extends EventEmitter {
    actions: Action[]
    action_types: ActionType[]
    action_impacts: ActionImpact[]
    filtered: Action[]
    fetching: boolean

    constructor() {
        super();
        this.actions = new Array<Action>()
        this.action_types = new Array<ActionType>()
        this.action_impacts = new Array<ActionImpact>()
        this.fetching = false
    }
    
    getActions() {
        let used_types = this.action_types.filter((x) => {
            return x.used == true
        }).map((y) => {
            return y.type
        })

        let used_impacts = this.action_impacts.filter((x) => {
            return x.used == true
        }).map((y) => {
            return y.is_positive
        })

        return this.actions.filter((action) => {
            return used_types.indexOf(action.type) != -1 && used_impacts.indexOf(action.is_positive) != -1
        })
    }

    updateActionsByType(action_type: ActionType){
        let index = this.action_types.map((type) => {
            return type.type
        }).indexOf(action_type.type)

        if(index != -1) {
            this.action_types[index].used = action_type.used
        }
    }

    updateActionsByImpact(action_impact: ActionImpact){
        let index = this.action_impacts.map((impact) => {
            return impact.is_positive
        }).indexOf(action_impact.is_positive)

        if(index != -1) {
            this.action_impacts[index].used = action_impact.used
        }
    }

    setActionTypes(actions: Action[]) {
        this.action_types =  actions.reduce((acc, action) => {
            if(acc.indexOf(action.type) == -1) {
                acc.push(action.type)
            }
            return acc;
        }, new Array<string>()).map((type) => (new ActionType(type, true)));

        this.setActionTypesColors(this.action_types);
    }

    setActionImpacts(){
        this.action_impacts.push(new ActionImpact("Positif", true))
        this.action_impacts.push(new ActionImpact("Négatif", true))
    }

    setActionTypesColors(types: ActionType[]) {
        var colorValue = 255;
        var index = 1;

        var switchIndex = 2;
        var switchValue = false;

        for(var i = 0; i < types.length; i++) {
            if(colorValue % 2 != 0)
                colorValue--;
            
            switch(index) {
                case 1:
                    types[i].color = new RGBColor(colorValue, 0, 0);
                    index = 2;
                    break;
                case 2:
                    types[i].color = new RGBColor(0, colorValue, 0);
                    index = 3;
                    break;
                case 3:
                    types[i].color = new RGBColor(0, 0, colorValue);
                    index = 1;
                    break;
            }

            if(i === switchIndex){
                if(switchValue)
                    colorValue = colorValue + (colorValue / 2);
                else
                    colorValue /= 2;

                switchValue = !switchValue;
                switchIndex += 3;
            }
        }
    }

    receiveActions(actions: Action[]){
        this.actions = actions
        this.setActionTypes(this.actions)
        this.setActionImpacts()
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "FETCH_ACTIONS":
                this.fetching = true
                this.emit("FETCH_ACTIONS")
                break;
            case "RECEIVE_ACTIONS":
                this.receiveActions((action as Actions.ReceiveActions).actions)
                this.fetching = false
                this.emit("RECEIVE_ACTIONS")
                break;
            case "FILTER_ACTIONS_BY_TYPE":
                this.updateActionsByType((action as Actions.FilterActionsByType).filter)
                this.emit("FILTER_ACTIONS_BY_TYPE")
                break;
            case "FILTER_ACTIONS_BY_IMPACT":
                this.updateActionsByImpact((action as Actions.FilterActionsByImpact).filter)
                this.emit("FILTER_ACTIONS_BY_IMPACT")
                break;
        }
    }
}

const store = new ActionMapStore();
export default store;

dispatcher.register(store.handleActions.bind(store));