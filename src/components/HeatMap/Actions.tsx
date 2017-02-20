import dispatcher from "../dispatcher"
import * as Actions from "./actions/GetData"
import * as Models from "./models/IPlayerActions"
import { IRawData } from "./models/BaseModels"
import { IZone } from "./models/BaseModels"
import {serverUrl} from "Config"
import axios from 'axios'

export function GetData(playerid: number, matchid: number, searchTypes: string[]) {
    const send = new Actions.GetData();
    dispatcher.dispatch(send);
    axios.get(serverUrl + '/stats/match/' + matchid + '/player/' + playerid)
      .then(function (response) {
        let data: Models.IPlayerActions = response.data as Models.IPlayerActions;
        var rawData: IRawData[] = new Array();
        var actionTypes: string[] = new Array();
        for (let action of data.actions) {
          if(searchTypes.length == 0 || searchTypes.indexOf(action.TypeAction.name) != -1)
          {
            var x = Math.floor(action.x1*4);
            var y = Math.floor(action.y1*3);
            var entry: IRawData = {x: x, y: y, valid:action.is_valid};
            rawData.push(entry);
          }
          if (actionTypes.indexOf(action.TypeAction.name) == -1){
            actionTypes.push(action.TypeAction.name);
          }
        }
        var zones: IZone[] = new Array();
        for (var x = 0; x < 4; x++) {
          for (var y = 0; y < 3; y++) {
            var zone: IZone = {x: x, y: y, percentage:0, rating:0}
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
        const recieve = new Actions.RecieveData(zones, actionTypes)
        dispatcher.dispatch(recieve);
      })
      .catch(function (error) {
        console.log(error);
      });
}