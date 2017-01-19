import { EventEmitter } from "events";
import { IAction } from "../IAction"
import dispatcher from "../dispatcher";
import {RecieveData} from "./actions/GetData"
import {IZone} from "./models/BaseModels"

class HeatMapStore extends EventEmitter {
    zones: IZone[];
    message: string;

    constructor() {
    super();
    this.zones = [,];
    this.message = "";
  }

  getZones(){
      return this.zones;
  }

  handleActions(action: IAction){
      switch(action.type) {
      case "GET_ZONES": {
        this.message = "Loading..."
        this.emit("change")
        break;
      }
      case "RECIEVE_ZONES": {
        this.zones = (action as RecieveData).zones;
        this.emit("change");
        break;
      }
    }
    }
}

const heatMapStore = new HeatMapStore();
export default heatMapStore;

dispatcher.register(heatMapStore.handleActions.bind(heatMapStore));