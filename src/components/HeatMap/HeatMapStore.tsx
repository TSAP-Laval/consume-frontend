import { EventEmitter } from "events";
import { IAction } from "../IAction"
import dispatcher from "../dispatcher";
import {RecieveData} from "./actions/GetData"
import {IZone} from "./models/BaseModels"

class HeatMapStore extends EventEmitter {
    zones: IZone[];
    fetching: boolean;
    actions: string[];

    constructor() {
    super();
    this.zones = [];
    this.actions = [];
    this.fetching = false;
  }

  getZones(searchTypes?: string[]){
      return this.zones;
  }

  getActions(){
    return this.actions;
  }

  isFetching(){
    return this.fetching;
  }

  handleActions(action: IAction){
      switch(action.type) {
      case "GET_ZONES": {
        this.fetching = true;
        this.emit("GET_ZONES")
        break;
      }
      case "RECIEVE_ZONES": {
        this.zones = (action as RecieveData).zones;
        this.actions = (action as RecieveData).actionsTypes;
        this.fetching = false;
        this.emit("RECIEVE_ZONES");
        break;
      }
    }
    }
}

const heatMapStore = new HeatMapStore();
export default heatMapStore;

dispatcher.register(heatMapStore.handleActions.bind(heatMapStore));