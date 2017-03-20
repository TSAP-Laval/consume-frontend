import { EventEmitter } from "events";
import { IAction } from "../IAction"
import dispatcher from "../dispatcher";
import {RecieveData} from "./actions/GetData"
import * as BaseModels from "./models/BaseModels"

class HeatMapStore extends EventEmitter {
    zones: BaseModels.IZone[];
    fetching: boolean;
    actions: BaseModels.IAction[];
    actionTypes: {[type: string]: number};

    constructor() {
    super();
    this.zones = [];
    this.actions = [];
    this.actionTypes = {};
    this.fetching = false;
  }

  getZones(sizeX: number, sizeY: number, filters: string[]){
    this.zones = [];

    var rawData: BaseModels.IRawData[] = new Array();
    for (let action of this.actions) {
      if(filters.length == 0 || filters.indexOf(action.TypeAction.name) != -1)
      {
        var x = Math.floor(action.x1 * sizeX);
        var y = Math.floor(action.y1 * sizeY);
        var entry: BaseModels.IRawData = {x: x, y: y, valid:action.is_valid};
        rawData.push(entry);
      }
    }
    var zones: BaseModels.IZone[] = new Array();
    for (var x = 0; x < sizeX; x++) {
      for (var y = 0; y < sizeY; y++) {
        var zone: BaseModels.IZone = {x: x, y: y, percentage:0, rating:0}
        zones.push(zone);
      }
    }
    for (let zone of zones){
      var nbActions: number = 0;
      var rating: number = 0;
      for(let raw of rawData){
        if (raw.x == zone.x && raw.y == zone.y){
          nbActions++;
          if(raw.valid){
            rating++;
          }
        }
      }
      zone.percentage = +(nbActions/rawData.length).toFixed(2);
      zone.rating = + (rating/nbActions).toFixed(2);
    }
    this.zones = zones;
    return this.zones;
  }

  getActionTypes() {
    for(let action of this.actions) {
      if(this.actionTypes[action.TypeAction.name] == undefined) {
        this.actionTypes[action.TypeAction.name] = 0
      }
      this.actionTypes[action.TypeAction.name]++;
    }
    return this.actionTypes;
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
        this.actions = (action as RecieveData).actions;
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