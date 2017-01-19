import dispatcher from "../dispatcher"
import * as Actions from "./actions/GetData"
import * as Models from "./models/IPlayerActions"
import { IRawData } from "./models/BaseModels"
import { IZone } from "./models/BaseModels"
import axios from 'axios'

export function GetData(playerid: number, matchid: number) {
    const send = new Actions.GetData();
    dispatcher.dispatch(send);
    axios.get('http://localhost:8080/api/stats/match/' + matchid + '/player/' + playerid)
      .then(function (response) {
        let data: Models.IPlayerActions = response.data as Models.IPlayerActions;
        var rawData: IRawData[] = new Array();
        for (let action of data.actions) {
          var x = Math.floor(action.x1*4);
          var y = Math.floor(action.y1*3);
          var entry: IRawData = {x: x, y: y, valid:action.is_valid};
          rawData.push(entry);
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
          zone.percentage = +((nbActions/rawData.length) * 100).toFixed(2);
          zone.rating = + ((rating/nbActions) * 100).toFixed(2);
        }
        const recieve = new Actions.RecieveData(zones)
        dispatcher.dispatch(recieve);
      })
      .catch(function (error) {
        console.log(error);
      });
}