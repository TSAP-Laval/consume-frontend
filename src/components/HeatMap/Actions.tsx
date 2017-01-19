import dispatcher from "../dispatcher"
import * as Actions from "./actions/GetData"
import * as Models from "./models/IPlayerActions"
import { IRawData } from "./models/BaseModels"
import { IZone } from "./models/BaseModels"

export function GetData(playerid: number, matchid: number) {
    const send = new Actions.GetData();
    dispatcher.dispatch(send);
    axios.get('http://localhost:8080/api/stats/match/' + matchid + '/player/' + playerid)
      .then(function (response) {
        console.log(response);
        let data: Models.IPlayerActions = ExtractData(response)
        var rawData: IRawData[][];
        for (let action of data.actions) {
          console.log(action);
          var x = Math.floor(action.x1/4);
          var y = Math.floor(action.y2/3);
          rawData[x][y].valids.push(action.is_valid);
        }
        var zones: IZone[][];
        for (var x = 0; x < 4; x++) {
          for (var y = 0; y < 3; y++) {
            zones[x][y].percentage = +((rawData[x][y].valids.length/data.actions.length) * 100).toFixed(2);
            var positives: number;
            for (let valid of rawData[x][y].valids)
          }
        }
        //const recieve = new Actions.RecieveData()
        //dispatcher.dispatch(recieve);
      })
      .catch(function (error) {
        console.log(error);
      });
}

function ExtractData(jsonAxios: Axios.AxiosXHR<{}>): Models.IPlayerActions {
    var jsonString: string = String(jsonAxios.data)
    let obj: Models.IPlayerActions = JSON.parse(jsonString)
    return obj
}