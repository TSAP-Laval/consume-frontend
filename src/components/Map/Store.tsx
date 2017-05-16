import { EventEmitter } from "events";
import { IAction } from "../../Models/ActionCreation";
import * as Actions from "./Actions"
import { ZoneData, Coordinate, Zone, Size } from "../../Models/ComponentModels";
import dispatcher from "../dispatcher"
import FilterStore from "./Filter/Store"

class MapStore extends EventEmitter {
    actions: IAction[];
    fetching: boolean;
    zones: Zone[];
    mapParameters: Size;
    actionTypes: {[type: string]: number};

    constructor() {
        super();
        this.actions = new Array<IAction>();
        this.fetching = false;
        this.zones = new Array<Zone>();
        this.mapParameters = new Size(4,3);
        this.actionTypes = {};
    }

    receiveActions(actions: IAction[]){
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
            case "RECEIVE_PARAMETERS":
                 this.mapParameters = ((action as Actions.ReceiveMapParameters).parameters);
                 this.emit("RECEIVE_PARAMETERS");
                 break;
        }
    }

    getMapParameters() {
      return this.mapParameters;
    }

    setMapParameters(params: Size) {
      this.mapParameters = params;
    }

    getZones(filters: string[]){
      let zonesData = new Array<ZoneData>()

      for (let action of this.actions) {
        if(filters.length == 0 || filters.indexOf(action.type.name) != -1)
        {
          var x = Math.floor(action.start.x * this.mapParameters.width);
          var y = Math.floor(action.start.y * this.mapParameters.height);
          zonesData.push(new ZoneData(new Coordinate(x, y), action.is_positive))
        }
      }
      let zones = new Array<Zone>()

      for (var x = 0; x < this.mapParameters.width; x++) {
        for (var y = 0; y < this.mapParameters.height; y++) {
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
}

const store = new MapStore();
export default store;

dispatcher.register(store.handleActions.bind(store));