import { EventEmitter } from "events"
import IAction from "../../IAction"
import * as Actions from "./Actions"
import dispatcher from "../../dispatcher"
import {Action, ActionType} from "../Models"
import {ActionTypeFilter, ActionImpact, RGBColor} from "./Models"
import MapStore from "../Store"

class FilterStore extends EventEmitter {
    action_types: ActionTypeFilter[]
    action_types_count: {[type: string]: number}
    action_impacts: ActionImpact[]

    constructor() {
        super();
        this.action_types = new Array<ActionTypeFilter>()
        this.action_types_count = {}
        this.action_impacts = new Array<ActionImpact>()
    }

    getUsedTypeFilters(){
        let used_types = this.action_types.filter((x) => {
            return x.used == true
        }).map((y) => {
            return y.type
        })

        return used_types
    }

    getUsedImpactFilters(){
        let used_impacts = this.action_impacts.filter((x) => {
            return x.used == true
        }).map((y) => {
            return y.is_positive
        })

        return used_impacts
    }
    
    getAllFilteredActions() {
        return MapStore.actions.filter((action: Action) => {
            return this.getUsedTypeFilters().indexOf(action.type) != -1 && this.getUsedImpactFilters().indexOf(action.is_positive) != -1
        })
    }

    getActionsFilteredByType(){
        return MapStore.actions.filter((action: Action) => {
            return this.getUsedTypeFilters().indexOf(action.type) != -1
        })
    }

    getActionsFilteredByImpact(){
        return MapStore.actions.filter((action: Action) => {
            return this.getUsedImpactFilters().indexOf(action.is_positive) != -1
        })
    }

    updateActionsByType(action_type: ActionTypeFilter){
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

    getActionTypeNames() {
        return this.action_types.map((action_type) => {
            return action_type.type.name
        })
    }

    setActionTypes(actions: Action[]) {
        for(let i = 0; i < actions.length; i++) {
            if(this.getActionTypeNames().indexOf(actions[i].type.name) == -1) {
                let atf = new ActionTypeFilter(actions[i].type, true)
                this.action_types.push(atf)
                this.action_types_count[actions[i].type.name] = 1
            } else {
                this.action_types_count[actions[i].type.name]++
            }
        }

        this.setActionTypesColors(this.action_types)
    }

    setActionImpacts(){
        this.action_impacts.push(new ActionImpact("Positif", true))
        this.action_impacts.push(new ActionImpact("Négatif", true))
    }

    setActionTypesColors(types: ActionTypeFilter[]) {
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

    handleActions(action: IAction) {
        switch(action.type) {
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

const store = new FilterStore();
export default store;

dispatcher.register(store.handleActions.bind(store));