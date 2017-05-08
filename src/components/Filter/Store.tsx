import { EventEmitter } from "events"
import {ActionCreation, ComponentModels} from "../../Models"
import dispatcher from "../dispatcher"

class FilterStore extends EventEmitter {
    filters: Array<ComponentModels.Filter>

    constructor() {
        super();
        this.filters = new Array<ComponentModels.Filter>()
    }

    setNodesColors(nodes: Array<ComponentModels.FilterNode>) {
        var colorValue = 255;
        var index = 1;

        var switchIndex = 2;
        var switchValue = false;

        for(var i = 0; i < nodes.length; i++) {
            if(colorValue % 2 != 0)
                colorValue--;
            
            switch(index) {
                case 1:
                    nodes[i].color = new ComponentModels.RGBColor(colorValue, 0, 0);
                    index = 2;
                    break;
                case 2:
                    nodes[i].color = new ComponentModels.RGBColor(0, colorValue, 0);
                    index = 3;
                    break;
                case 3:
                    nodes[i].color = new ComponentModels.RGBColor(0, 0, colorValue);
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

    handleActions(action: ActionCreation.IAction) {
        switch(action.type) {
            
        }
    }
}

const store = new FilterStore();
export default store;

dispatcher.register(store.handleActions.bind(store));