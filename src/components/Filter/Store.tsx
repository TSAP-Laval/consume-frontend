import { EventEmitter } from "events"
import {IAction} from "../../Models/ActionCreation"
import {RGBColor, Filter, FilterNode} from "../../Models/ComponentModels"
import dispatcher from "../dispatcher"

class FilterStore extends EventEmitter {
    filters: Array<Filter>

    constructor() {
        super();
        this.filters = new Array<Filter>()
    }

    setNodesColors(nodes: Array<FilterNode>) {
        let colorValue = 255;
        let index = 1;

        let switchIndex = 2;
        let switchValue = false;

        for(let i = 0; i < nodes.length; i++) {
            if(colorValue % 2 != 0)
                colorValue--;
            
            switch(index) {
                case 1:
                    nodes[i].color = new RGBColor(colorValue, 0, 0);
                    index = 2;
                    break;
                case 2:
                    nodes[i].color = new RGBColor(0, colorValue, 0);
                    index = 3;
                    break;
                case 3:
                    nodes[i].color = new RGBColor(0, 0, colorValue);
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
            
        }
    }
}

const store = new FilterStore();
export default store;

dispatcher.register(store.handleActions.bind(store));