import IAction from "../../IAction"
import {Action} from "../../Matches/Models"

export class ActionImpactFilter {
    action_impacts: ActionImpact[]

   constructor(actions: Action[]) {
       this.setActionImpacts(actions)
   }

    getUsedActionImpacts() {
        let used_impacts = this.action_impacts.filter((x) => {
            return x.used == true
        }).map((y) => {
            return y.is_positive
        })

        return used_impacts
    }

    setActionImpacts(actions: Action[]) {
        this.action_impacts =  actions.reduce((acc, action) => {
            if(acc.indexOf(action.description) == -1) {
                acc.push(action.description)
            }
            return acc;
        }, new Array<string>()).map((impact: string) => (new ActionImpact(impact, true)));
    }

    updateActionImpacts(action_impact: ActionImpact){
        let index = this.action_impacts.map((impact) => {
            return impact.name
        }).indexOf(action_impact.name)

        if(index != -1) {
            this.action_impacts[index].used = action_impact.used
        }

        return this.action_impacts
    }
}

export class ActionTypeFilter {
    action_types: ActionType[]

    constructor(actions: Action[]) {
        this.setActionTypes(actions)
    }

    getUsedActionTypes() {
        let used_types = this.action_types.filter((x) => {
            return x.used == true
        }).map((y) => {
            return y.type
        })

        return used_types
    }

    setActionTypes(actions: Action[]) {
        this.action_types =  actions.reduce((acc, action) => {
            if(acc.indexOf(action.description) == -1) {
                acc.push(action.description)
            }
            return acc;
        }, new Array<string>()).map((type: string) => (new ActionType(type, true)));

        this.setActionTypesColors();
    }

    setActionTypesColors() {
        var colorValue = 255;
        var index = 1;

        var switchIndex = 2;
        var switchValue = false;

        for(var i = 0; i < this.action_types.length; i++) {
            if(colorValue % 2 != 0)
                colorValue--;
            
            switch(index) {
                case 1:
                    this.action_types[i].color = new RGBColor(colorValue, 0, 0);
                    index = 2;
                    break;
                case 2:
                    this.action_types[i].color = new RGBColor(0, colorValue, 0);
                    index = 3;
                    break;
                case 3:
                    this.action_types[i].color = new RGBColor(0, 0, colorValue);
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

    updateActionTypes(action_type: ActionType){
        let index = this.action_types.map((type) => {
            return type.type
        }).indexOf(action_type.type)

        if(index != -1) {
            this.action_types[index].used = action_type.used
        }

        return this.action_types
    }
}

export class Filters {
    action_impacts: ActionImpact[]
    action_types: ActionType[]

    constructor() {
        this.action_impacts = new Array<ActionImpact>()
        this.action_types = new Array<ActionType>()
    }

    getFilteredActions(Actions: Action[]) {
        
    }
}

export class ActionImpact {
    name: string
    is_positive: boolean
    used: boolean

    constructor(name: string, used: boolean) {
        this.name = name
        this.is_positive = (name === "Positif")
        this.used = used
    }
}

export class ActionType {
    type: string
    used: boolean
    color: RGBColor

    constructor(type: string, used: boolean) {
        this.type = type
        this.used = used
    }
}

export class RGBColor {
    r: number
    g: number
    b: number

    constructor(r: number, g: number, b: number) {
        this.r = r
        this.g = g
        this.b = b
    }
}