import { EventEmitter } from "events"
import IAction from "../IAction"
import * as Actions from "./Actions"
import {Action, ZoneData, Coordinate, Zone} from "./Models"
import dispatcher from "../dispatcher"
import FilterStore from "./Filter/Store"

class MapStore extends EventEmitter {
    actions: Action[];
    fetching: boolean;
    zones: Zone[];

    constructor() {
        super();
        this.actions = new Array<Action>();
        this.fetching = false;
        this.zones = new Array<Zone>();
    }

    receiveActions(actions: Action[]){
        this.actions = actions;
        FilterStore.setActionTypes(actions);
        FilterStore.setActionImpacts();
    }

    handleActions(action: IAction) {
        switch(action.type) {
            case "FETCH_ACTIONS":
                this.fetching = true
                this.emit("FETCH_ACTIONS")
                break;
            case "RECEIVE_ACTIONS":
                this.fetching = false
                this.receiveActions((action as Actions.ReceiveActions).actions)
                this.emit("RECEIVE_ACTIONS")
                break;
        }
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
}

const store = new MapStore();
export default store;

dispatcher.register(store.handleActions.bind(store));