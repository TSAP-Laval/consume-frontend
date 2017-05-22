import { EventEmitter } from "events"
import Dispatcher from "../Dispatcher"
import {IAction} from "../../models/ActionCreation";
import * as Actions from "./Actions"
import {Size} from "../../models/ComponentModels";

class PreferencesStore extends EventEmitter {
    mapSize: Size;

    constructor() {
        super();
        this.mapSize = new Size(3,4);
    }

    getMapSize() {
        return this.mapSize;
    }


    setMapSize(size: Size){
        this.mapSize = size;
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "RECEIVE_MAP_SIZE":
                this.setMapSize((action as Actions.ReceiveMapSize).map_size);
                this.emit(action.type);
                break;
        }
    }
}

const store = new PreferencesStore();
export default store;

Dispatcher.register(store.handleActions.bind(store));