import { EventEmitter } from "events";
import dispatcher from "../../dispatcher";
import {getActions} from "../ActionsCreator"
import {Action, Zone, ZoneData, Coordinate} from "../models"
import IAction from "../../IAction"
import MapStore from "../Store"
import * as Actions from "../Actions"

class HeatMapStore extends EventEmitter {
    actions: Action[]
    zones: Zone[]
    fetching: boolean
    actionTypes: {[type: string]: number}

    constructor() {
      super();
      this.actions = new Array<Action>()
      this.zones = new Array<Zone>()
      this.actionTypes = {};
      this.fetching = false;
    }

    getZones(sizeX: number, sizeY: number, filters: string[]){
      let zonesData = new Array<ZoneData>()

      for (let action of this.actions) {
        if(filters.length == 0 || filters.indexOf(action.type.name) != -1)
        {
          var x = Math.floor(action.start.x * sizeX);
          var y = Math.floor(action.start.y * sizeY);
          zonesData.push(new ZoneData(new Coordinate(x, y), action.is_positive))
        }
      }

      let zones = new Array<Zone>()

      for (var x = 0; x < sizeX; x++) {
        for (var y = 0; y < sizeY; y++) {
          zones.push(new Zone(new Coordinate(x, y), 0, 0));
        }
      }

      for (let zone of zones){
        let nbActions = 0;
        let rating = 0;

        for(let zoneData of zonesData){
          if (zoneData.coordinate.x == zone.coordinate.x && zoneData.coordinate.y == zone.coordinate.y){
            nbActions++;

            if(zoneData.is_positive){
              rating++;
            }
          }
        }

        zone.percentage = + (nbActions / zonesData.length).toFixed(2);
        zone.rating = + (rating / nbActions).toFixed(2);
      }

      this.zones = zones;

      return this.zones;
    }

    getActionTypes() {
      for(let action of this.actions) {

        if(this.actionTypes[action.type.name] == undefined) {
          this.actionTypes[action.type.name] = 0
        }

        this.actionTypes[action.type.name]++;
      }

      return this.actionTypes;
    }

    handleActions(action: IAction){
        switch(action.type) {
          case "FETCH_ACTIONS": {
            this.fetching = true;
            this.emit("FETCH_ACTIONS")
            break;
          }
          case "RECEIVE_ACTIONS": {
            this.actions = (action as Actions.ReceiveActions).actions;
            this.fetching = false;
            this.emit("RECEIVE_ACTIONS");
            break;
          }
        }
    }
}

const heatMapStore = new HeatMapStore();
export default heatMapStore;

dispatcher.register(heatMapStore.handleActions.bind(heatMapStore));