import { EventEmitter } from "events";
import { IAction } from "../interfaces"
import dispatcher from "../dispatcher";

class HeatMapStore extends EventEmitter {
    zones: number[];

    constructor() {
    super();
    this.zones = [];
  }

  getZones(playerid: number){
      //requete HTTP pour get les infos sur un joueur
      this.emit("change");
      return this.zones;
  }
}

const heatMapStore = new HeatMapStore();
export default heatMapStore;